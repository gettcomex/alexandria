class HomeController < ApplicationController
	def permissions

		render json: {
			user: {
				id: current_user.id,
				name: current_user.name,
				email: current_user.email,
				login: current_user.login,
				is_employee: current_user.is_employee?
			},
			books: {
				read:   	current_user.is_employee?,
				create: 	current_user.is_employee?,
				update: 	current_user.is_employee?,
				destroy: 	current_user.is_employee?
			}
		}

	end
end
