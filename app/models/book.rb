class Book < ActiveRecord::Base
  
  has_many :queue_lists
  has_many :loans

  attr_accessible :copies, :created_by, :pages, :title, :update_by, :writer

  scope :by_availability, lambda{ |id|
        joins(:)

        joins(:product).where(products: {product_category_id: id}) if id.present?
    }

   book
   		quantidade 

   loan, 
   		livros 
   			data 
   				so tenho a data e não status :( 


 	select b.copies, 

 	-- count(
 			select 
 				id 
 			from 
 				loans 
 			where
 				start_at >= Now.time.7.days.ago and 
 				end_at >= Now.time
 		) as copies_loan

 	from 
 		books b 

 	where 
 		id = x;



end
