class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title,			null: false, limit: 260
      t.string :writer,			null: false, limit: 160
      t.integer :pages,			null: false, limit: 50560
      t.integer :copies,		null: false, limit: 15
      t.integer :created_by
      t.integer :update_by

      t.timestamps
    end

    add_index :books, :id
    add_index :books, :title
    add_index :books, :writer
  end
end
