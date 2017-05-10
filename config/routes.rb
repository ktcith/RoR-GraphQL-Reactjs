# require 'paperclip_downloads/paperclip_downloads'
# require 'sidekiq/web'

Rails.application.routes.draw do
  authenticate :user do
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/queries"
  end
  authenticate :user, -> (u){ u.is_super? } do
    mount Sidekiq::Web, at: "/sidekiq"
  end
  devise_for :users
  root to: "client#index"
  get "asset_test", to: "client#asset_test"
  resources :queries
  resource :sha, only: :show
  scope '/graphql' do
    post "/", to: "queries#create"
  end

end
