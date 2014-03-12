json.count @books_count
json.data @books do |book|
	json.id book.id
	json.title 			book.title
	json.writer 		book.writer
	json.copies 		book.copies
	json.pages			book.pages
	json.title_writer	book.title_writer
end