class Book < ActiveRecord::Base
  
  has_many :queue_lists
  has_many :loans

  attr_accessible :copies, :created_by, :pages, :title, :update_by, :writer

  scope :by_availability, lambda { |id, today | 
   	joins(:loans).where(
   		'loans.book_id = ? and loans.starts_at >= ? and loans.end_at >= ?', 
   		id, (today - 7.day), today)
  }

end
