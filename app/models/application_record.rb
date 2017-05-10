require 'csv'

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def to_gid(gql_type = nil, ctx = {})
    gql_type ||= Schema.resolve_type(self, ctx)
    Schema.id_from_object(self, gql_type, ctx)
  end

end
