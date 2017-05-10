module GraphQLTypeHelpers
  def authorize!(action, subject, ctx, message = nil)
    current_ability = ctx[:current_ability]
    message ||= current_ability.unauthorized_message(action, subject)
    raise CanCan::AccessDenied.new(message, action, subject) unless current_ability.can?(action, subject)
  end
end
GraphQL::Define::DefinedObjectProxy.include GraphQLTypeHelpers

module GraphQLQueryHelpers
  def resolve=(new_resolve_proc)
    # To disable uncomment this
    # return super new_resolve_proc

    super(
      RescueFrom.new({
        CanCan::AccessDenied => ->(data) {
          err = data[:err]
          "You are not authorized to #{err.action} this #{err.subject ? err.subject.class.name : "item"}."
        },
        StandardError => ->(data) {
          err = data[:err]
          "An unexpected error occurred #{err.message}"
        },
      }, new_resolve_proc)
    )
  end
end
GraphQL::Relay::Mutation.prepend GraphQLQueryHelpers
