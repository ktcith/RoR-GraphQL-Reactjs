class RescueFrom
  def initialize(error_superclasses_with_messages, resolve_func)
    @error_superclasses_with_messages = error_superclasses_with_messages
    @error_superclasses = []
    if @error_superclasses_with_messages.is_a?(Hash)
      @error_superclasses = @error_superclasses_with_messages.keys
    else
      @error_superclasses = @error_superclasses_with_messages
    end

    @resolve_func = resolve_func
  end

  def call(obj, args, ctx)
    @resolve_func.call(obj, args, ctx)
  rescue *@error_superclasses => err
    Rails.logger.error("#{err.message}\n#{err.backtrace.join("\n ")}")
    if @error_superclasses_with_messages.is_a?(Hash)
      message_handler = @error_superclasses_with_messages[err.class]
    end
    message = message_handler.nil? ? err.message : message_handler.call({err: err, obj: obj, args: args, ctx: ctx})
    GraphQL::ExecutionError.new(message)
  end
end
