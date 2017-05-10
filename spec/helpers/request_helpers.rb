module RequestHelpers
  def sign_in_as(user)
    user ||= FactoryGirl.create :user, :valid
    post user_session_path, params: {'user[email]' => user.email, 'user[password]' => user.password}
  end

  def post_relay_query(query, variables = nil)
    parameters = { query: query, format: :json }
    parameters.merge!(variables: variables) if variables
    post queries_path, params: parameters
  end
end
