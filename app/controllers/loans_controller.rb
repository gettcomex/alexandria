class LoansController < ApplicationController
  
  before_filter :load_resources, only: %w(new create edit update)
  # GET /loans
  # GET /loans.json
  def index
    @loans = Loan.page(params[:page]).per(5)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @loans }
    end
  end

  # GET /loans/1
  # GET /loans/1.json
  def show
    @loan = Loan.find(params[:id])
    authorize! :read, @loan

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @loan }
    end
  end

  # GET /loans/new
  # GET /loans/new.json
  def new
    @loan = Loan.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @loan }
    end
  end

  # GET /loans/1/edit
  def edit
    @loan = Loan.find(params[:id])
    authorize! :update, @loan
  end

  # POST /loans
  # POST /loans.json
  def create
  	
    if params[:loan_submit] == 'Salvar'
	    @loan = Loan.new(params[:loan])
	    respond_to do |format|
	      if @loan.save
	        format.html { redirect_to @loan, notice: 'Loan was successfully created.' }
	        format.json { render json: @loan, status: :created, location: @loan }
	      else
	        format.html { render action: "new" }
	        format.json { render json: @loan.errors, status: :unprocessable_entity }
	      end
	    send_mail(@loan)
	    end
	else
		# Reserva de livros, não encontramos outra maneira 
		@queuelist = QueueList.new(params[:loan])
		respond_to do |format|
	      if @queuelist.save
	        format.html { redirect_to @queuelist, notice: 'Queue was successfully created.' }
	      else
	        format.html { render action: "new" }
	      end
	    end
	end

  end

  def send_mail(loan)
  	user = User.find(params[:loan][:user_id])
  	book = Book.find(loan.book_id)

    UserMailer.loan_confirmation(user, book, loan).deliver
  end

  # PUT /loans/1
  # PUT /loans/1.json
  def update
    @loan = Loan.find(params[:id])

    respond_to do |format|
      if @loan.update_attributes(params[:loan])
        format.html { redirect_to @loan, notice: 'Loan was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @loan.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /loans/1
  # DELETE /loans/1.json
  def destroy
    @loan = Loan.find(params[:id])
    @loan.destroy

    respond_to do |format|
      format.html { redirect_to loans_url }
      format.json { head :no_content }
    end
  end

  protected 

  def load_resources
  	@users = User.all
    @books = Book.all
    @queue_list = QueueList

  end 

end
