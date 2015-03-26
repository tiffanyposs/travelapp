Rails.application.routes.draw do



  resources :friends

  resources :comments, only: [:create, :index]

  resources :suggestions, only: [:create, :destroy, :index]

  # resources :categories, only: [:create]

  resources :trips

  resources :users

  resource :session, only: [:new, :create, :destroy]

  get '/logout' => 'sessions#destroy'

  get '/suggestion/:id/upvote' => 'suggestions#upvote'

  get '/suggestion/:id/downvote' => 'suggestions#downvote'

  get '/suggestion/:id/getcomments' => 'comments#suggestion_comments'

  get '/suggestion/:category_id/all' => 'suggestions#index'

  get '/suggestion/:id/show' => 'suggestions#show'

  get '/categories/:trip_id' => 'categories#index'

  get '/categories/:id/show' => 'categories#show'

  get '/return_current_user' => 'mains#return_current_user'

  get '/usertrip' => 'trips#user_trip'

  get '/userfriends' => 'friends#user_friends'

  get '/' => 'mains#index'




  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
