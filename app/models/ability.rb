class Ability
	include CanCan::Ability

	def initialize(user)

		user ||= User.new
		if user.is_employee?
			can :manage, :all
		else
			can :create, Loan
			can :read, Loan do |loan|
				loan.try(:user_id) == user.id
			end
			can :update, Loan do |loan|
				loan.try(:user_id) == user.id
			end
			can :create, QueueList
			can :destroy, QueueList do |queue_list|
				queue_list.try(:user_id) == user.id
			end
			can :read, Book		
			can :update, User do |target_user|
				target_user.try(:id) == user.id
			end

			can :read, User do |target_user|
				target_user.try(:id) == user.id
			end
			can :update, User do |target_user|
				target_user.try(:id) == user.id
			end
		end
	end
end
