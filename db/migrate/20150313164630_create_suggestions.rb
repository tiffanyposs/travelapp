class CreateSuggestions < ActiveRecord::Migration
  def change
    create_table :suggestions do |t|
      t.references :user, index: true, null: false
      t.references :category, index: true, null: false
      t.string :title, null: false
      t.text :content
      t.string :link
      t.integer :upvote, default: 0
      t.integer :downvote, default: 0

      t.timestamps null: false
    end
  end
end
