class UsersController < ApplicationController
	respond_to :json
	skip_before_filter :authenticate_user!, :verify_authenticity_token
	
	def index
		@users = User.select('id, name, is_employee')
		
		if !current_user.is_employee?
			@users = @users.where(id: current_user.id)
		end
		@users_count = @users.size
		@users = @users.page(params[:page].to_i).limit(params[:limit].to_i).offset(params[:start].to_i) unless params[:page].blank?
	end

	def show
		@user = User.find params[:id]
		respond_with @user
	end

	def create
		@user = User.new(params[:user])
		if @user.save
			render json: @user.id, status: :ok
		else
			render json: @user.errors, status: :unprocessable_entity
		end
	end

	def update
		@user = User.find params[:id]
		if @user.update_attributes params[:user]
			render json: @user.id, status: :ok
		else
			render json: @user.errors, status: :unprocessable_entity
		end
	end

	def destroy
		User.destroy params[:id].split(',')
		render nothing: true
	end
end