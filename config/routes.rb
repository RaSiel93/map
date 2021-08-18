Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'

  get 'home', to: 'home#index'

  namespace :api do
    namespace :v1 do
      resources :areas, only: %i[index create update destroy]
      resources :cars, only: %i[index create update destroy]
      resources :notes, only: %i[index create update destroy]
      resources :people, only: %i[index create update destroy]
      resources :companies, only: %i[index create update destroy]
    end
  end
end
