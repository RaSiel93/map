namespace :deploy do
  desc 'Prepare frontend in public/ (upload, copy, or server build)'
  task :build_frontend do
    strategy = fetch(:frontend_strategy).to_s

    case strategy
    when 'upload'
      public_dir = File.join(Dir.pwd, 'public')
      index_html = File.join(public_dir, 'index.html')
      static_dir = File.join(public_dir, 'static')

      unless File.directory?(static_dir)
        raise 'public/static is missing. Run: yarn build && yarn deploy'
      end
      unless File.file?(index_html)
        raise 'public/index.html is missing. Run: yarn build && yarn deploy'
      end

      on roles(:app) do
        within release_path do
          execute :rm, '-rf', 'public/static', 'public/index.html', 'public/asset-manifest.json'
        end
        # scp uploads the directory itself — target must be release_path, not release_path/public
        upload!(
          File.join(Dir.pwd, 'public'),
          release_path,
          recursive: true
        )
        within release_path do
          unless test('[ -d public/static/js ]') && test('[ -f public/index.html ]')
            raise 'Frontend upload failed: public/static or public/index.html missing on server'
          end
        end
      end
    when 'copy'
      on roles(:app) do
        within release_path do
          if test("[ -d #{previous_release}/public/static ]")
            execute :cp, '-a', "#{previous_release}/public/.", 'public/'
          end
        end
      end
    when 'server'
      on roles(:app) do
        within release_path do
          yarn_bin = fetch(:yarn_bin)
          env_file = "#{shared_path}/.env"
          script = [
            'export NVM_DIR="$HOME/.nvm"',
            '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"',
            %(yarn_bin="#{yarn_bin}"),
            'command -v "$yarn_bin" >/dev/null || { echo "yarn not found ($yarn_bin)"; exit 127; }',
            'set -a',
            "[ -f #{env_file} ] && . #{env_file}",
            'set +a',
            'export REACT_APP_API_URL="${REACT_APP_API_URL:-}"',
            'export NODE_OPTIONS="--max-old-space-size=4096"',
            '"$yarn_bin" --cwd client install --frozen-lockfile',
            '"$yarn_bin" --cwd client build',
            'cp -a client/build/. public/',
          ].join(' && ')
          execute :bash, '-lc', script
        end
      end
    else
      raise "Unknown frontend_strategy: #{strategy} (upload, copy, or server)"
    end
  end

  before 'deploy:publishing', 'deploy:build_frontend'
end
