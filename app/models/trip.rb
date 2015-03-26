class Trip < ActiveRecord::Base
  belongs_to :user
  has_one :group
  has_many :categories
end
