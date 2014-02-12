# encoding: UTF-8
class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :open_most_important, :authenticate_user!


  protected
    def open_most_important
      @menu = {  
        :home 	 => { :name => 'Home', 		  :link => '/home'  }, 
        :books   => { :name => 'Livros', 	  :link => '/books' }, 
        :loans	 => { :name => 'Empréstimos', :link => '/loans' }, 
        :users 	 => { :name => 'Usuários', 	  :link => '/users' }, 
        :my_user => { :name => 'Meu Usuário', :link => '/home'  }}
      @current_menu_item = :books
    end

end