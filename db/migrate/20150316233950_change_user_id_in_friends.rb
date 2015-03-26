class ChangeUserIdInFriends < ActiveRecord::Migration

  def change
    change_table :friends do |t|
      t.rename :user_id_id, :user_id
    end
  end

end
