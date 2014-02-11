# encoding: UTF-8
class Loan < ActiveRecord::Base

  has_one :book
  has_one :user  

  attr_accessible :book_id, :created_by, :end_at, :starts_at, :update_by, :user_id

  validates :update_by, presence: true 
  
  before_save :check_user_loans
 

  def check_user_loans
 	
  	pessoa = User.find(self.user_id)
  	
  	id_loans_count = pessoa.loans.select { | loan | loan.starts_at > 7.days.ago.time && loan.end_at >= Time.now}.count

  	if id_loans_count == 3 && !pessoa.is_employee || id_loans_count >= 10 
  		errors.add :max_user_loans, "O usuário #{pessoa.name} atingiu o limite de emprestimos" 
  		return false 
  	end

  end 


end
