SignOut = GraphQL::Relay::Mutation.define do
  name "SignOut"
  return_field :root, RootType
  return_field :success, types.Boolean

  resolve -> (root_obj, args, ctx) {
    ctx[:request].reset_session
    {
      success: true,
    }
  }
end
