class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :login
      t.string :password
      t.boolean :is_employee
      t.integer :created_by
      t.integer :update_by

      t.timestamps
    end
  end
end
