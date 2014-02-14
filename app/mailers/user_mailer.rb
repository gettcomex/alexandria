class UserMailer < ActionMailer::Base
default :from => "lucasluandemelo@gmail.com"  
  
  def loan_confirmation(user, book, loan) 
  	@user = user
  	@loan = loan 
  	@book = book
  	
    mail(:to => user.email, :subject => "Emprestimo")  
  end  
end
