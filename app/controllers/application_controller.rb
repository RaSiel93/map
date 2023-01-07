class ApplicationController < ActionController::Base
  before_action :authenticate_admin_user!

  after_action :set_csrf_cookie

  def set_csrf_cookie
    cookies[:csrf_token] = form_authenticity_token
  end
end
