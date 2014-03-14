Alexandria::Application.routes.draw do
  
  devise_for :users

  resources :loans

  resources :queue_lists

  resources :books

  resources :users

  match '/permissions'  => 'home#permissions'

  root :to => "home#index"
   
end
