class Group < ActiveRecord::Base
  belongs_to :trip
  has_many :users
end
