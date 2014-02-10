class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.string :writer
      t.integer :pages
      t.integer :copies
      t.integer :created_by
      t.integer :update_by

      t.timestamps
    end
  end
end
