class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  helper_method :current_user

    def current_user
      return nil unless session[:session_token]
      @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def login!(user)
      session[:session_token] = token
      user.session_token = session[:session_token]
      user.save!
    end

    def logout!
      current_user.update(session_token: nil)
      session[:session_token] = token
    end

    def token
      return SecureRandom.urlsafe_base64
    end

    private

    def require_current_user
      redirect_to new_session_url unless current_user
    end
end
