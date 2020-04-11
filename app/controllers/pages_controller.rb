class PagesController < ApplicationController
  def home
    @items = Item.all
    # render component: "Appp", props: { items: @items }
  end
end
