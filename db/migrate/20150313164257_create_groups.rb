class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.references :trip, index: true
      t.references :user, index: true

      t.timestamps null: false
    end
  end
end
