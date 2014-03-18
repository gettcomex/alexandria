class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name,			null: false, limit: 200
      t.string :login,			null: false, limit: 20
      t.boolean :is_employee,	default: false
      t.string :password, 		limit: 15
      t.integer :created_by
      t.integer :update_by
      t.timestamps
    end
    add_index :users, :id
    add_index :users, :login
    add_index :users, :password
  end
end
