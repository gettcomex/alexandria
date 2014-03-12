class LoansController < ApplicationController

	respond_to :json
	before_filter :load_resources, only: %w(create update)

	def index
		@loans = Loan.select("id, book_id, user_id, starts_at, end_at")

		respond_to do |format|
			format.html { render layout: 'system' } # index.html.erb
			format.json {
				@loans_count = @loans.size
				@loans = @loans.page(params[:page].to_i).limit(params[:limit].to_i).offset(params[:start].to_i) unless params[:page].blank?
			}
		end
	end

	def show
		@loan = Loan.select("id, book_id, user_id, starts_at, end_at").find(params[:id])
		authorize! :read, @loan

		respond_with @loan 
	end

	def create

		if params[:loan_submit] == 'Salvar'
			@loan = Loan.new(params[:loan])
			
			#FIXME Verificar o funcionamento.
			if @loan.save
				render json: @loan.id, status: :ok
			else
				render json: @loan.errors, status: :unprocessable_entity
			end

			send_mail(@loan)
			
		else
			# Reserva de livros, não encontramos outra maneira 
			@queuelist = QueueList.new(params[:loan])
			
			#FIXME Verificar o funcionamento, se não criar um auto form...
			if @queuelist.save
				render json: @queuelist.id, status: :ok
			else
				render json: @queuelist.errors, status: :unprocessable_entity
			end
		end

	end

	def send_mail(loan)
		user = User.find(params[:loan][:user_id])
		loan = Loan.find(loan.loan_id)

		UserMailer.loan_confirmation(user, loan, loan).deliver
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

	protected 
	def load_resources
		@users = User.all
		@loans = Loan.all
		@queue_list = QueueList
	end 

end
