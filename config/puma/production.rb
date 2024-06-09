root_dir = File.expand_path("../../..", __FILE__)
shared_dir = File.expand_path("../../../../shared", __FILE__)

directory root_dir

max_threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
min_threads_count = ENV.fetch("RAILS_MIN_THREADS") { max_threads_count }
threads min_threads_count, max_threads_count

worker_timeout 3600 if ENV.fetch("RAILS_ENV", "development") == "development"

port ENV.fetch("PORT") { 5000 }

environment "production"

bind "unix://#{shared_dir}/tmp/sockets/puma.sock"

stdout_redirect "#{shared_dir}/log/puma.stdout.log", "#{shared_dir}/log/puma.stderr.log", true

pidfile "#{shared_dir}/tmp/pids/puma.pid"
state_path "#{shared_dir}/tmp/pids/puma.state"
activate_control_app

plugin :tmp_restart

rackup "#{root_dir}/config.ru"
