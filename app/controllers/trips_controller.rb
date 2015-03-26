class TripsController < ApplicationController
  before_action :set_trip, only: [:show, :edit, :update, :destroy]
  before_action :require_current_user


  # GET /trips
  # GET /trips.json
  def index
    @trips = Trip.all
  end

  # GET /trips/1
  # GET /trips/1.json
  def show
  end

  def user_trip
    @trip = Trip.where(user_id: current_user.id)
    respond_to do |format|
      format.json { render json: @trip }
    end
  end

  # GET /trips/new
  def new
    @trip = Trip.new
  end

  # GET /trips/1/edit
  def edit
  end

  # POST /trips
  # POST /trips.json
  def create
    @trip = Trip.new(trip_params)
    @group = Group.create(user_id: current_user.id)
    @trip.update(group_id: @group.id, user_id: current_user.id)

    respond_to do |format|
      if @trip.save
        @group.update(trip_id: @trip.id)
        @food = Category.create(name: 'food', trip_id: @trip.id)
        @lodging = Category.create(name: 'lodging', trip_id: @trip.id)
        @adventure = Category.create(name: 'adventure', trip_id: @trip.id)
        format.html { redirect_to @trip, notice: 'Trip was successfully created.' }
        format.json { render :show, status: :created, location: @trip }
      else
        format.html { render :new }
        format.json { render json: @trip.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /trips/1
  # PATCH/PUT /trips/1.json
  def update
    respond_to do |format|
      if @trip.update(trip_params)
        format.html { redirect_to @trip, notice: 'Trip was successfully updated.' }
        format.json { render :show, status: :ok, location: @trip }
      else
        format.html { render :edit }
        format.json { render json: @trip.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /trips/1
  # DELETE /trips/1.json
  def destroy
    @trip.destroy
    respond_to do |format|
      format.html { redirect_to trips_url, notice: 'Trip was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trip
      @trip = Trip.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def trip_params
      params.require(:trip).permit(:location, :title, :description, :duration)
    end
end
