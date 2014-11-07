class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer     :player1_id
      t.integer     :player2_id
      t.integer     :duration, default:   30
      t.boolean     :completed, default:  false
      t.string      :winner
      t.timestamps
    end
  end
end
