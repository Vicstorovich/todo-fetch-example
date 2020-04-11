class ItemSerializer < ActiveModel::Serializer
  attributes :id, :label, :important, :done
end
