namespace :deploy do
  desc 'Build React frontend into public/, or copy from previous release'
  task :build_frontend do
    on roles(:app) do
      within release_path do
        if fetch(:build_frontend)
          execute :yarn, '--cwd client install --frozen-lockfile'
          execute :bash, '-lc', <<~SHELL
            set -a
            [ -f #{shared_path}/.env ] && . #{shared_path}/.env
            set +a
            export REACT_APP_API_URL="${REACT_APP_API_URL:-}"
            export NODE_OPTIONS="--max-old-space-size=4096"
            yarn --cwd client build
            cp -a client/build/. public/
          SHELL
        elsif test("[ -d #{previous_release}/public/static ]")
          execute :cp, '-a', "#{previous_release}/public/.", 'public/'
        end
      end
    end
  end

  before 'deploy:publishing', 'deploy:build_frontend'
end
