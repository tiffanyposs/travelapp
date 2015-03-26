class CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    @comment.save
    # respond_to do |format|
    #   format.json { render json: @comment }
    # end
    redirect_to :back
    # redirect_to '/suggestion/:category_id/all'
  end

  def index
    @all_comments = Comment.all
    respond_to do |format|
      format.json { render json: @all_comments }
    end
  end

  def suggestion_comments
    @comments = Comment.where(suggestion_id: params[:id]).all
    respond_to do |format|
      format.json { render json: @comments }
    end
  end

  private

  def comment_params
    @comment_params ||= params.require(:comment).permit(:suggestion_id, :content)
  end

end
