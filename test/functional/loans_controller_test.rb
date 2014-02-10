require 'test_helper'

class LoansControllerTest < ActionController::TestCase
  setup do
    @loan = loans(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:loans)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create loan" do
    assert_difference('Loan.count') do
      post :create, loan: { book_id: @loan.book_id, created_by: @loan.created_by, end_at: @loan.end_at, starts_at: @loan.starts_at, update_by: @loan.update_by, user_id: @loan.user_id }
    end

    assert_redirected_to loan_path(assigns(:loan))
  end

  test "should show loan" do
    get :show, id: @loan
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @loan
    assert_response :success
  end

  test "should update loan" do
    put :update, id: @loan, loan: { book_id: @loan.book_id, created_by: @loan.created_by, end_at: @loan.end_at, starts_at: @loan.starts_at, update_by: @loan.update_by, user_id: @loan.user_id }
    assert_redirected_to loan_path(assigns(:loan))
  end

  test "should destroy loan" do
    assert_difference('Loan.count', -1) do
      delete :destroy, id: @loan
    end

    assert_redirected_to loans_path
  end
end
