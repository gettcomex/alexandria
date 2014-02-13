class MyUserController < ApplicationController


 def load_resources
  	@users = User.all
    @books = Book.all
 end 

end
