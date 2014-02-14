# encoding: UTF-8
class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :open_most_important, :authenticate_user!

  rescue_from CanCan::AccessDenied do |exception|
  	flash[:error] = "Access denied."
  	redirect_to root_url
  end
  
  protected
    def open_most_important
      @menu = {  
        :home 	 => { :name => 'Home', 		  :link => '/home'  }, 
        :books   => { :name => 'Livros', 	  :link => '/books' }, 
        :loans	 => { :name => 'Empréstimos', :link => '/loans' },
        :users 	 => { :name => 'Usuários', 	  :link => '/users' }}
        # COMO PASSAR PARAMETROS? 
        #:my_user => { :name => 'Meu Usuário', :link_to => "users#show", @user }}
      @current_menu_item = :home
    end

end