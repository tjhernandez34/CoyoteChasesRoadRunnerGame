before do
  @logged_in = session[:logged_in]
  @player1 = session[:player1]
  @player2 = session[:player2]
end

# welcome/login page ==================================

get '/' do
  erb :index
end

post '/login' do
  player1 = Player.find_by_email(params[:player1][:email])
  player2 = Player.find_by_email(params[:player2][:email])
  # game = Game.create(player1_id: player1.id, player2_id: player2.id)
  if !player1 || !player2
    redirect '/signup'
  else
    if player1.authorized?(params[:player1][:password]) && player2.authorized?(params[:player2][:password])
      session[:logged_in] = true
      session[:player1] = player1.id
      session[:player2] = player2.id
      game = Game.create(player1_id: session[:player1], player2_id: session[:player2])
      redirect "/games/#{game.id}/player1/#{player1.id}/player2/#{player2.id}"
    end
  end
  game = Game.create(player1_id: player1.id, player2_id: player2.id)
  redirect "/games/#{game.id}/player1/#{player1.id}/player2/#{player2.id}"
end

# signup page =========================================

get '/signup' do
  erb :signup
end

post '/signup' do
  new_player = Player.create(params[:player])
  if new_player.valid?
    redirect "/"
  else
    erb :signup#, locals: { errors: new_player.errors.full_messages.uniq }
  end
end

# logout button route =================================

get '/logout' do
  session.destroy
  redirect '/'
end
