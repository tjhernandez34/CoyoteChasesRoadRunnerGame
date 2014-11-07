require 'bcrypt'

class Player < ActiveRecord::Base
  include BCrypt
  has_and_belongs_to_many   :games
  validates_presence_of :name, :email, :password_hash
  validates_uniqueness_of :email

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def authorized?(attempted_password)
    self.password == attempted_password
  end
end
