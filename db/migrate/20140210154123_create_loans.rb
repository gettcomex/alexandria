class CreateLoans < ActiveRecord::Migration
  def change
    create_table :loans do |t|
      t.integer :book_id
      t.integer :user_id
      t.datetime :starts_at
      t.datetime :end_at
      t.integer :created_by
      t.integer :update_by

      t.timestamps
    end
  end
end
