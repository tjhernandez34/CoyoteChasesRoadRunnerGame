class Game < ActiveRecord::Base
  has_and_belongs_to_many   :players
  validates :completed, inclusion: { in: [true, false] }
  validates_presence_of :player1_id, :player2_id, :duration

  def players
    player1 = Player.find(self.player1_id)
    player2 = Player.find(self.player2_id)
    [player1, player2]
  end
end