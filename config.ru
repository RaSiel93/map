# This file is used by Rack-based servers to start the application.

require 'rbtrace' if ENV['RBTRACE'] == '1'

require_relative "config/environment"

run Rails.application
Rails.application.load_server
