class User < ActiveRecord::Base

	has_many :queue_lists,	dependent: :destroy
	has_many :loans,		dependent: :destroy

	validates :email,		presence: true
	validates :password,	presence: true, :on => :create, length: {minimum: 6, maximum: 15}
	validates :name,		presence: true, length: {maximum: 200}
	validates :login,		presence: true, length: {minimum: 5, maximum: 20}

	validates_uniqueness_of :email, :login

	devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

	attr_accessible :email, :password, :password_confirmation, :remember_me
	attr_accessible :created_by, :is_employee, :login, :name, :password, :update_by
end