Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root 'home#index'
  get '/health', to: 'health_check#show'

  namespace :api do
    namespace :v1 do
      resources :areas, only: %i[index create show update destroy]
      resources :cars, only: %i[index create update destroy]
      resources :notes, only: %i[index create update destroy]
      resources :people, only: %i[index create update destroy]
      resources :companies, only: %i[index create update destroy]
      resources :load, only: %i[index create update destroy]
      resources :tag_keys, only: %i[index]
      resources :tags, only: %i[index]
      resources :search, only: %i[index]
    end
  end

  get '/*path' => 'home#index'
end
