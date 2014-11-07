class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string      :name
      t.string      :email
      t.string      :password_hash
      t.integer     :games_played,  default: 0
      t.integer     :games_won,     default: 0
      t.timestamps
    end
  end
end