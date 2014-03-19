class AddReturnedToLoan < ActiveRecord::Migration
  def change
  	add_column :loans, :returned, :boolean
  end
end
