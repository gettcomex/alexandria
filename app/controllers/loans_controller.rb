class LoansController < ApplicationController

	respond_to :json
	load_and_authorize_resource

	def index
		@loans = Loan.select("id, book_id, user_id, starts_at, end_at")

		if !current_user.is_employee?
			@loans = @loans.where(user_id: current_user)
		end

		@loans_count = @loans.size
		@loans = @loans.page(params[:page].to_i).limit(params[:limit].to_i).offset(params[:start].to_i) unless params[:page].blank?
		
		respond_with @loan
	end

	def show
		@loan = Loan.select("id, book_id, user_id, starts_at, end_at").find(params[:id])
		authorize! :read, @loan

		respond_with @loan 
	end

	def create 
		debugger
		@loan = Loan.new(params[:loan])
	
		if @loan.save
			render json: @loan.id, status: :ok
			send_mail(@loan)
		else
			render json: @loan.errors, status: :unprocessable_entity
			return false
		end
		

		#FIXME Verificar o funcionamento.
		# else
		# 	# Reserva de livros, não encontramos outra maneira 
		# 	@queuelist = QueueList.new(params[:loan])

		# 	#FIXME Verificar o funcionamento, se não criar um auto form...
		# 	if @queuelist.save
		# 		render json: @queuelist.id, status: :ok
		# 	else
		# 		render json: @queuelist.errors, status: :unprocessable_entity
		# 	end
		
	end

	def send_mail(loan)
		user = User.find(loan.user_id)
		loan = Loan.find(loan.id)
		book = Book.find(loan.book_id)

		UserMailer.loan_confirmation(user, book, loan).deliver
	end

	def update
		@loan = Loan.find(params[:id])

		if @loan.update_attributes(params[:loan])
			render json: @queuelist.id, status: :ok
		else
			render json: @queuelist.errors, status: :unprocessable_entity
		end	
		
	end

	def destroy
		Loan.destroy params[:id].split(',')
		render nothing: true
	end
end
