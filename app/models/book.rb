class Book < ActiveRecord::Base

	has_many :queue_lists,	dependent: :destroy
	has_many :loans,		dependent: :destroy

	validates :book_type,	presence: true
	validates :title,		presence: true, length: {minimum: 3, maximum: 260}
	validates :writer,		presence: true, length: {minimum: 4, maximum: 160}
	validates :copies,		presence: true, numericality: {less_than: 15,		greater_than: 0}
	validates :pages,		presence: true, numericality: {less_than: 50560,	greater_than: 0}

	attr_accessible :copies, :created_by, :pages, :title, :update_by, :writer, :book_type

	scope :by_availability, lambda { |book_id, today|
		joins(:loans).where(
			'loans.book_id = ? and loans.starts_at >= ? and loans.end_at >= ? and returned = false',
			book_id, (today - 7.day), today)
	}

	scope :by_wait_list, lambda { |book_id|
		joins(:queue_lists).where(
			'queue_lists.book_id = ?', book_id).order('id')
	}

end