# encoding: UTF-8
class Loan < ActiveRecord::Base

  has_one :book
  has_one :user  

  attr_accessible :book_id, :created_by, :end_at, :starts_at, :update_by, :user_id

  validates :update_by, presence: true 
  
  before_create :check_user_loans
 
  before_validation :before_validation 

  def before_validation
  	#
  end 


  def check_user_loans
 	
  	pessoa = User.find(self.user_id)
  	
  	id_loans_count = pessoa.loans.select { | loan | loan.starts_at > 7.days.ago && loan.end_at.to_datetime >= Time.now.to_datetime}.count

  	if id_loans_count >= 3 && !pessoa.is_employee || id_loans_count >= 10 
  		errors.add :limit_loans, "O usuário #{pessoa.name} atingiu o limite de emprestimos" 
  		return false 
  	end

  end 


end
