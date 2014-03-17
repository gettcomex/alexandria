class UsersController < ApplicationController
	respond_to :json
	skip_before_filter :authenticate_user!, :verify_authenticity_token
	
	def index
		@users = User.select('id, name, is_employee')
		
		respond_to do |format|
			format.html { render layout: 'system' } # index.html.erb
			format.json {
				@users_count = @users.size
				@users = @users.page(params[:page].to_i).limit(params[:limit].to_i).offset(params[:start].to_i) unless params[:page].blank?
			}
		end
	end

	def show
		@user = User.find params[:id]
		respond_with @user
	end

	def create
		@user = User.new(params[:user])
		debugger
		if @user.save
			render json: @user.id, status: :ok
		else
			render json: @user.errors, status: :unprocessable_entity
		end
	end

	# PUT /users/1
	# PUT /users/1.json
	def update
		@user = User.find params[:id]
		if @user.update_attributes params[:user]
			render json: @user.id, status: :ok
		else
			render json: @user.errors, status: :unprocessable_entity
		end
	end

	# DELETE /users/1
	# DELETE /users/1.json
	def destroy
		User.destroy params[:id].split(',')
		render nothing: true
	end
end