class SuggestionsController < ApplicationController

  def index
    @suggestions = Suggestion.all
  end

  def create
    @suggestion = Suggestion.new(suggestion_params)
    @suggestion.user_id = current_user.id
    @suggestion.save
    redirect_to :back
  end

  def index
    @suggestions = Suggestion.where(category_id: params[:category_id])
    respond_to do |format|
      format.json { render json: @suggestions }
    end
  end

  def show
    @suggestion = Suggestion.find(params[:id])
    respond_to do |format|
      format.json { render json: @suggestion }
    end
  end

  def upvote
    id = params[:id]
    @suggestion = Suggestion.find(id)
    @suggestion.upvote += 1
    @suggestion.save
  end

  def downvote
    id = params[:id]
    @suggestion = Suggestion.find(id)
    @suggestion.downvote += 1
    @suggestion.save
  end

  def destroy
    id = params[:id]
    @suggestion = Suggestion.find(id)
    @suggestion.destroy
  end

  private

  def suggestion_params
    @suggestion_params ||= params.require(:suggestion).permit(:title, :content, :link, :category_id)
  end
end
