class Icon
  include ActiveModel::Model
  attr_accessor :id, :icon, :category, :legend

  def initialize(class_or_record, icon, category=nil)
    if (class_or_record.class == Class)
      @id = class_or_record
      @legend = class_or_record.to_s
    else
      @id = "#{class_or_record.class}#{class_or_record.id}"
      @legend = class_or_record.class.to_s
    end
    @category = category || "standard"
    @icon = icon
  end

end
