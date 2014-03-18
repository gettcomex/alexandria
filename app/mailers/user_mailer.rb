class UserMailer < ActionMailer::Base
default :from => "alexandria.biblioteca.no.reply@gmail.com"  
  
  def loan_confirmation(user, book, loan) 
  	@user = user
  	@loan = loan 
  	@book = book
  	
    mail(:to => user.email, :subject => "Emprestimo")  
  end  
end
