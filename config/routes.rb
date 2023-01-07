Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :areas, only: %i[index create show update destroy]
      resources :cars, only: %i[index create update destroy]
      resources :notes, only: %i[index create update destroy]
      resources :people, only: %i[index create update destroy]
      resources :companies, only: %i[index create update destroy]
    end
  end

  get '/*path' => 'home#index'
end
