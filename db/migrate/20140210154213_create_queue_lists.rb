class CreateQueueLists < ActiveRecord::Migration
  def change
    create_table :queue_lists do |t|
      t.integer :book_id
      t.integer :user_id
      t.integer :created_by
      t.integer :update_by

      t.timestamps
    end

    add_index :queue_lists, :id
    add_index :queue_lists, :book_id
    add_index :queue_lists, :user_id

  end
end
