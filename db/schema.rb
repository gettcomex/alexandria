# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140313191205) do

  create_table "books", :force => true do |t|
    t.string   "title"
    t.string   "writer"
    t.integer  "pages"
    t.integer  "copies"
    t.integer  "created_by"
    t.integer  "update_by"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "book_type"
  end

  add_index "books", ["id"], :name => "index_books_on_id"

  create_table "loans", :force => true do |t|
    t.integer  "book_id"
    t.integer  "user_id"
    t.datetime "starts_at"
    t.datetime "end_at"
    t.integer  "created_by"
    t.integer  "update_by"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "loans", ["book_id"], :name => "index_loans_on_book_id"
  add_index "loans", ["id"], :name => "index_loans_on_id"
  add_index "loans", ["user_id"], :name => "index_loans_on_user_id"

  create_table "queue_lists", :force => true do |t|
    t.integer  "book_id"
    t.integer  "user_id"
    t.integer  "created_by"
    t.integer  "update_by"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "queue_lists", ["book_id"], :name => "index_queue_lists_on_book_id"
  add_index "queue_lists", ["id"], :name => "index_queue_lists_on_id"
  add_index "queue_lists", ["user_id"], :name => "index_queue_lists_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "login"
    t.string   "password"
    t.boolean  "is_employee"
    t.integer  "created_by"
    t.integer  "update_by"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0,  :null => false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
