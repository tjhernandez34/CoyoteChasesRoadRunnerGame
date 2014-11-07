get '/games/:id/player1/:player1_id/player2/:player2_id' do
  @game = Game.find(params[:id])
  @players = @game.players
  erb :game
end

post '/games/:id/gameover' do
  # @game = Game.find(params[:id])
  # @player1 = Player.find(params[:player1stuff])
  # @player2 = Player.find(params[:player2stuff])
  content_type "application/json"
  halt 200, { message: "game over. nice work, #{params[:winner]}!",
   id: params[:id] }.to_json
end

get '/games/:id/gameover' do
  @game = Game.find(params[:id])
  erb :game_over
end


# https://www.youtube.com/watch?v=0jTHNBKjMBU
