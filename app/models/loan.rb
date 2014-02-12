# encoding: UTF-8
class Loan < ActiveRecord::Base

  has_one :book
  has_one :user  

  attr_accessible :book_id, :created_by, :end_at, :starts_at, :update_by, :user_id
  
  after_initialize :set_default_date
  
  before_create :check_user_loans, :set_update_user

  before_update :set_create_user

  

  private
  
  def set_default_date
  	self.starts_at = set_date(Time.now)
  	  	
  	self.end_at = set_date(Time.now + 9.day) 
  end 

  def set_date(date)
  	return (date.saturday?) ? date + 2.day : (date.sunday?) ? date + 1.day : date
  end  
  
  def set_create_user
  	
  end

  def set_update_user
  	
  end


  def check_user_loans
 	
  	pessoa = User.find(self.user_id)
  	
  	id_loans_count = pessoa.loans.select { | loan | loan.starts_at >= 7.days.ago && loan.end_at.to_datetime >= Time.now.to_datetime}.count

  	if id_loans_count >= 3 && !pessoa.is_employee || id_loans_count >= 10 
  		errors.add :limit_loans, "O usuário #{pessoa.name} atingiu o limite de empréstimos" 
  		return false 
  	end

  end 

end
