class User < ActiveRecord::Base

	has_many :queue_lists
	has_many  :loans 

	validates :password, :presence => true, :on => :create

	# Include default devise modules. Others available are:
	# :confirmable, :lockable, :timeoutable and :omniauthable
	devise :database_authenticatable, :registerable,
		:recoverable, :rememberable, :trackable, :validatable

	# Setup accessible (or protected) attributes for your model
	attr_accessible :email, :password, :password_confirmation, :remember_me
	attr_accessible :created_by, :is_employee, :login, :name, :password, :update_by

end