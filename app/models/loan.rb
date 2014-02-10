class Loan < ActiveRecord::Base

  has_one :book
  has_one :user  

  attr_accessible :book_id, :created_by, :end_at, :starts_at, :update_by, :user_id
end
