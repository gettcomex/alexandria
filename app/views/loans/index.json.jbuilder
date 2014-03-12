json.count @loans_count
json.data @loans do |loan|
	json.id loan.id
	json.book_id 	loan.book_id
	json.user_id 	loan.user_id
	json.starts_at 	loan.starts_at
	json.end_at		loan.end_at
end