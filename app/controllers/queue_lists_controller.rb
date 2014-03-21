class QueueListsController < ApplicationController

	respond_to :json

	def index
		@queue_lists = QueueList.all
		format.json { render json: @queue_lists }
	end

	def create
		@queue_list = QueueList.new(params[:queue_list])

		if @queue_list.save
			render json: @queue_list.id , status: :ok
		else
			render json: @queue_list.errors, status: :unprocessable_entity
		end
	end

	def destroy
		QueueList.destroy params[:id].split(',')
		render nothing: true
	end
end