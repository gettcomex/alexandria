class Book < ActiveRecord::Base
  
  has_many :queue_lists
  has_many :loans

  attr_accessible :copies, :created_by, :pages, :title, :update_by, :writer, :book_type

  scope :by_availability, lambda { |book_id, today | 
   	joins(:loans).where(
   		'loans.book_id = ? and loans.starts_at >= ? and loans.end_at >= ?', 
   		book_id, (today - 7.day), today)
  }

  scope :by_wait_list, lambda { |book_id|
  	joins(:queue_lists).where(
  		'queue_lists.book_id = ?', book_id).order('id')
  }

end
