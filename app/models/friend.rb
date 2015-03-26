class Friend < ActiveRecord::Base
  belongs_to :user

  def self.user_friends(id)
    arr = Friend.where(user_id: id).all

    friends = arr.map do |user|
      friend = User.where(id: user.friend_id)
      friend[0]
    end
    return friends
  end
end
