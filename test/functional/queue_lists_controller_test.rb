require 'test_helper'

class QueueListsControllerTest < ActionController::TestCase
  setup do
    @queue_list = queue_lists(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:queue_lists)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create queue_list" do
    assert_difference('QueueList.count') do
      post :create, queue_list: { book_id: @queue_list.book_id, created_by: @queue_list.created_by, update_by: @queue_list.update_by, user_id: @queue_list.user_id }
    end

    assert_redirected_to queue_list_path(assigns(:queue_list))
  end

  test "should show queue_list" do
    get :show, id: @queue_list
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @queue_list
    assert_response :success
  end

  test "should update queue_list" do
    put :update, id: @queue_list, queue_list: { book_id: @queue_list.book_id, created_by: @queue_list.created_by, update_by: @queue_list.update_by, user_id: @queue_list.user_id }
    assert_redirected_to queue_list_path(assigns(:queue_list))
  end

  test "should destroy queue_list" do
    assert_difference('QueueList.count', -1) do
      delete :destroy, id: @queue_list
    end

    assert_redirected_to queue_lists_path
  end
end
