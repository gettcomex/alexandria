# encoding: UTF-8
class Loan < ActiveRecord::Base

	belongs_to :book
	belongs_to :user

	validates_presence_of :book_id, :user_id, :starts_at, :end_at

	attr_accessible :book_id, :created_by, :end_at, :starts_at, :update_by, :user_id

	before_create :user_loans_limit?, :can_loan?, :set_default_date

	before_update :can_user_renew_loan?, :set_default_date

	private

	def set_default_date
		self.starts_at = set_date(Time.now)
		self.end_at = set_date(Time.now + 7.day)
	end

	def set_date(date)
		return (date.saturday?) ? date + 2.day : (date.sunday?) ? date + 1.day : date
	end

	def can_user_renew_loan?

		renew_loan_book = Loan.find(self.id).book

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

		if loaned_books >= book.copies
			return false
		end
		# como o rails retorna o ultimo valor, tenho que forçar.
		return true
	end

	def reserved_book?(book, user)
		# Escopo faz a consulta mas não traz os dados da reserva :(
		reserved_book = QueueList.where('queue_lists.book_id = ?', book.id).order('id').limit(1)

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

		user_loans_count = Loan.where("user_id = ? and starts_at >= ? and end_at >= ?", self.user_id, 7.days.ago, Time.now).count

		if user_loans_count >= 3 && !current_user.is_employee || user_loans_count >= 10
			errors.add :limit_loans, "O usuário #{current_user.name} atingiu o limite de empréstimos"
			return false
		end
	end
end