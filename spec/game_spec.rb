# require 'spec_helper'

# describe Game do
#   let(:player_1_params) { name:     "Wile E. Coyote",
#                           email:    "wiley@acme.com",
#                           password: "foo" }
#   let(:player_2_params) { name:     "Road Runner",
#                           email:    "road@runner.com",
#                           password: "bar" }
#   let(:wiley) { Player.create(player_1_params) }
#   let(:roadrunner) { Player.create(player_2_params) }
#   let(:game_params) {   player_1_id:    wiley.id,
#                         player_2_id:    roadrunner.id   }
#   let(:game) { Game.create game_params }

#   describe "#players" do
#     it 'return an Array of Player objects' do
#       expect(game.players).to be_a Array
#       expect(game.players.length).to eq 2
#       expect(game.players.first).to be_a Player
#     end
#   end
# end