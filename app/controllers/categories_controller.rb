class CategoriesController < ApplicationController

  def index
    id = params[:trip_id]
    @categories = Category.where(trip_id: id).all
    respond_to do |format|
      format.json { render json: @categories }
      format.html 
    end
  end

  def show
    id = params[:id]
    @category = Category.find(id)
    respond_to do |format|
      format.json { render json: @category }
    end
  end

end
