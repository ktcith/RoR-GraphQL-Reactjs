RecordInterface = GraphQL::InterfaceType.define do
  name("Record")

  field :id, !types.ID, "Id"
  field :rails_id, !types.Int do
    resolve -> (record, args, ctx) {
      record.id
    }
  end
  field :to_s, !types.String, "Title of record"
  field :icon, IconType
end
