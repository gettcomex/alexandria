class AddTipoToBooks < ActiveRecord::Migration
  def change
  	add_column :books, :book_type, :integer
  end
end
