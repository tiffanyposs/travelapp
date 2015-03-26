class FriendsController < ApplicationController

  def user_friends
    @friends = Friend.user_friends(current_user.id)
    respond_to do |format|
      format.json { render json: @friends }
    end
  end

end
