class Item < ApplicationRecord
  validates :label, presence: true
end
