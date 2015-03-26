json.array!(@users) do |user|
  json.extract! user, :id, :first_name, :last_name, :username, :email, :password_digest, :session_token
  json.url user_url(user, format: :json)
end
