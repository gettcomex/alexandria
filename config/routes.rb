Alexandria::Application.routes.draw do
  
  devise_for :users

  resources :loans

  resources :queue_lists

  resources :books

  resources :users

  root to: 'start_page#index'
  	  get "start_page/index"
   	  match '/home'   => "start_page#index",  :as => :home
   
end
