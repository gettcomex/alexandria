class QueueList < ActiveRecord::Base

	has_one :book
	has_one :user

	validates_presence_of :book_id, :user_id

	attr_accessible :book_id, :created_by, :update_by, :user_id
end