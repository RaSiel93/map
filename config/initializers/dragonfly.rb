require 'dragonfly'

# Configure
Dragonfly.app.configure do
  plugin :imagemagick

  secret "c5168472f3eac83f17382e218b2e88ae8caa976fd3fb33fe44d90be617f8ab10"

  url_format "/media/:job/:name"

  datastore :file,
    root_path: Rails.root.join('files/system/dragonfly', Rails.env),
    server_root: Rails.root.join('files')
end

# Logger
Dragonfly.logger = Rails.logger

# Mount as middleware
Rails.application.middleware.use Dragonfly::Middleware

# Add model functionality
ActiveSupport.on_load(:active_record) do
  extend Dragonfly::Model
  extend Dragonfly::Model::Validations
end
