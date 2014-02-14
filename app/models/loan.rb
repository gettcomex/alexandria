# encoding: UTF-8
class Loan < ActiveRecord::Base

  has_one :book
  has_one :user  

  attr_accessible :book_id, :created_by, :end_at, :starts_at, :update_by, :user_id
  
  after_initialize :set_default_date
  
  before_create :user_loans_limit?, :can_loan?, :set_update_user

  before_update :can_user_renew_loan?

  private
  
  def set_default_date
  	self.starts_at = set_date(Time.now)
  	  	
  	self.end_at = set_date(Time.now + 9.day) 
  end 

  def set_date(date)
  	return (date.saturday?) ? date + 2.day : (date.sunday?) ? date + 1.day : date
  end  
  
  def set_create_user
  	
  end

  def set_update_user
  	
  end

  def can_user_renew_loan?

  	renew_loan_book = Book.find(self.book_id)

  	if not reserved_book?(renew_loan_book, self.user_id)
  		return false
  	end

  	return true
  end

  def can_loan? 
  	book = Book.find(self.book_id)
  	

  	if not availability_book?(book)
  		errors.add :all_loaned_books, "Todas as cópias do livro #{book.title} se encontram emprestadas"
  		return false
  	end

  	if not reserved_book?(book, self.user_id)
  		
  		return false
  	end

  end

  def availability_book?(book)
  	
  	loaned_books = Book.by_availability(book.id, Time.now).count

  	# TODO: ambiente de testes, mudar para equal 
  	if loaned_books >= book.copies 
  		return false
  	end

  	# como o rails retorna o ultimo valor, tenho que forçar.
  	return true 

  end


  def reserved_book?(book, user)

  	# Escopo faz a consulta mas não traz os dados da reserva :(
   	reserved_book = QueueList.where('queue_lists.book_id = ?', book.id).order('id').limit(1)
   	#Book.by_wait_list(book_id).limit(1)

   	# passa ok
   	if !reserved_book.any?
   		return true
   	end

   	if reserved_book[0].user_id != user
  		errors.add :reserved_book, "O livro não pode ser renovado pois se encontra reservado para outro usuário"
  		return false 
  	end

  	QueueList.delete(reserved_book[0].id)

   end

  def user_loans_limit? 
 	pessoa = User.find(self.user_id)
  	
  	# TODO: melhorar a parte final do select da data de entrega, porque dois to_datetime.
  	id_loans_count = pessoa.loans.select { | loan | loan.starts_at >= 7.days.ago && loan.end_at.to_datetime >= Time.now.to_datetime}.count

  	if id_loans_count >= 3 && !pessoa.is_employee || id_loans_count >= 10 
  		errors.add :limit_loans, "O usuário #{pessoa.name} atingiu o limite de empréstimos" 
  		return false 
  	end

  end 

end