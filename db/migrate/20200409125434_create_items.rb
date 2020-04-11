class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :label
      t.boolean :important, null: false, default: false
      t.boolean :done, null: false, default: false

      t.timestamps
    end
  end
end
