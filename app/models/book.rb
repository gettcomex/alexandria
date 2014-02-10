class Book < ActiveRecord::Base
  
  has_many :queue_lists
  has_many :loans

  attr_accessible :copies, :created_by, :pages, :title, :update_by, :writer
end
