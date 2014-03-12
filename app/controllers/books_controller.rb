class BooksController < ApplicationController
	respond_to :json
	load_and_authorize_resource
	
	def index
		@books = Book.select("id, title, writer, pages, copies, created_at, updated_at, title || ' - ' || writer as title_writer")
		
		respond_to do |format|
			format.html { render layout: 'system' } # index.html.erb
			format.json {
				@books_count = @books.size
				@books = @books.page(params[:page].to_i).limit(params[:limit].to_i).offset(params[:start].to_i) unless params[:page].blank?
			}
		end
	end

	def show
		@book = Book.select("title, writer, pages, copies,  title || ' - ' || writer as title_writer").find params[:id]
		respond_with @book
	end

	def create
		@book = Book.new(params[:book])

		if @book.save
			render json: @book.id, status: :ok
		else
			render json: @book.errors, status: :unprocessable_entity
		end
	end

	# PUT /books/1
	# PUT /books/1.json
	def update
		@book = Book.find params[:id]
		if @book.update_attributes params[:book]
			render json: @book.id, status: :ok
		else
			render json: @book.errors, status: :unprocessable_entity
		end
	end

	# DELETE /books/1
	# DELETE /books/1.json
	def destroy
		Book.destroy params[:id].split(',')
		render nothing: true
	end
end