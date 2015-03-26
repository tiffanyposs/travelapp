class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.references :suggestion, index: true
      t.references :user, index: true
      t.text :content, null: false

      t.timestamps null: false
    end
  end
end
