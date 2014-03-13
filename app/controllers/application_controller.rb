# encoding: UTF-8
class ApplicationController < ActionController::Base

  before_filter :authenticate_user!
  protect_from_forgery
  skip_before_filter :verify_authenticity_token

  rescue_from CanCan::AccessDenied do |exception|
  	flash[:error] = "Access denied."
  	redirect_to root_url
  end
end