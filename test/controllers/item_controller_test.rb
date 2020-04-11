require 'test_helper'

class ItemControllerTest < ActionDispatch::IntegrationTest
  test "should get label:string" do
    get item_label:string_url
    assert_response :success
  end

  test "should get important:boolean" do
    get item_important:boolean_url
    assert_response :success
  end

  test "should get done:boolean" do
    get item_done:boolean_url
    assert_response :success
  end

end
