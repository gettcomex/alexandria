class QueueListsController < ApplicationController
  # GET /queue_lists
  # GET /queue_lists.json
  def index
    @queue_lists = QueueList.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @queue_lists }
    end
  end

  # GET /queue_lists/1
  # GET /queue_lists/1.json
  def show
    @queue_list = QueueList.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @queue_list }
    end
  end

  # GET /queue_lists/new
  # GET /queue_lists/new.json
  def new
    @queue_list = QueueList.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @queue_list }
    end
  end

  # GET /queue_lists/1/edit
  def edit
    @queue_list = QueueList.find(params[:id])
  end

  # POST /queue_lists
  # POST /queue_lists.json
  def create
    @queue_list = QueueList.new(params[:queue_list])

    respond_to do |format|
      if @queue_list.save
        format.html { redirect_to @queue_list, notice: 'Queue list was successfully created.' }
        format.json { render json: @queue_list, status: :created, location: @queue_list }
      else
        format.html { render action: "new" }
        format.json { render json: @queue_list.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /queue_lists/1
  # PUT /queue_lists/1.json
  def update
    @queue_list = QueueList.find(params[:id])

    respond_to do |format|
      if @queue_list.update_attributes(params[:queue_list])
        format.html { redirect_to @queue_list, notice: 'Queue list was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @queue_list.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /queue_lists/1
  # DELETE /queue_lists/1.json
  def destroy
    @queue_list = QueueList.find(params[:id])
    @queue_list.destroy

    respond_to do |format|
      format.html { redirect_to queue_lists_url }
      format.json { head :no_content }
    end
  end
end
