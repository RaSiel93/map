namespace :logs do
  def tail_log(*paths)
    on roles(:app) do
      execute :tail, '-f', *paths
    end
  end

  def show_log(lines, *paths)
    on roles(:app) do
      execute :tail, '-n', lines.to_s, *paths
    end
  end

  desc 'Tail Rails production log'
  task :rails do
    tail_log "#{shared_path}/log/production.log"
  end

  desc 'Tail Puma stdout and stderr'
  task :puma do
    tail_log(
      "#{shared_path}/log/puma.stdout.log",
      "#{shared_path}/log/puma.stderr.log"
    )
  end

  desc 'Tail nginx access and error logs'
  task :nginx do
    tail_log(
      "#{current_path}/log/nginx.access.log",
      "#{current_path}/log/nginx.error.log"
    )
  end

  desc 'Tail Rails, Puma, and nginx logs'
  task :tail do
    tail_log(
      "#{shared_path}/log/production.log",
      "#{shared_path}/log/puma.stdout.log",
      "#{shared_path}/log/puma.stderr.log",
      "#{current_path}/log/nginx.access.log",
      "#{current_path}/log/nginx.error.log"
    )
  end

  desc 'Show last N lines (default 100). Usage: cap production logs:show[200]'
  task :show, [:lines] do |_t, args|
    lines = (args[:lines] || 100).to_i
    show_log(
      lines,
      "#{shared_path}/log/production.log",
      "#{shared_path}/log/puma.stderr.log",
      "#{current_path}/log/nginx.error.log"
    )
  end
end
