json.count @users_count
json.data @users do |user|
	json.id user.id
	json.name user.name
	json.is_employee user.is_employee 
end