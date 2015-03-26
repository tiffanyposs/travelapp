class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.references :group, index: true
      t.references :user, index: true, null: false
      t.string :location, null: false
      t.string :title, null: false
      t.string :description
      t.string :duration

      t.timestamps null: false
    end
  end
end
