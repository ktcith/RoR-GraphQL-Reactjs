class QueriesController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :authenticate_user_from_token!

  def new
  end

  def create
    # Setup context
    if current_user
      current_ability = Ability.new(current_user)
    elsif api_token = params[:token]
      current_ability = Ability.new(nil, api_token: api_token)
    else
      current_ability = nil
    end

    context = {
      request: request,
      current_user: current_user,
      current_ability: current_ability,
      params: params
    }

    if params[:_json]
      # react-relay-network-layer's batchMiddleware sent us an array of queries
      # {_json: [{:id, :query, :variables}, …] }

      # We merge queries and get the results using theorygeek's MergedQuery
      # https://gist.github.com/theorygeek/85b2f7df6931a0eb3f06141ef1e57f30
      multi_queries = params[:_json]
      texts = multi_queries.map { |q| q['query'] }
      variables = multi_queries.map { |q| ensure_hash(q['variables']) }
      merged_queries = GraphQL::Language.merge_queries(texts, variables)
      combined_result = merged_queries.execute_combined(Schema, context: context)

      # Finally we split the results and match the expected
      # format of react-relay-network-layer
      # `[{ id: '…', payload: { } }]`
      ids = multi_queries.map { |q| q['id'] }
      results = merged_queries.split_results(combined_result)
      formatted_result = ids.zip(results).map { |id, result| { id: id, payload: result } }
      render json: formatted_result
    else
      query_string = params[:query]
      query_variables = ensure_hash(params[:variables])
      result = Schema.execute(
        query_string,
        variables: query_variables,
        context: context
      )
      render json: result
    end
  end

  private

  def ensure_hash(query_variables)
    if query_variables.blank?
      {}
    elsif query_variables.is_a?(String)
      JSON.parse(query_variables)
    else
      query_variables
    end
  end
end
