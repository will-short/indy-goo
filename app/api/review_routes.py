from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review
from app.forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages
import json
review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<int:listingId>/reviews/', methods=["POST"])
@login_required
def postReview(listingId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            content=form.data["content"],
            rating=form.data["rating"],
            listing_id=listingId,
            owner_id=current_user.id
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()


@review_routes.route('/<int:listingId>/reviews/<int:reviewId>/', methods=["PUT"])
@login_required
def editReview(listingId, reviewId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(reviewId)
        review.content = form.data["content"],
        review.rating = form.data["rating"],
        db.session.commit()
        return review.to_dict()


@review_routes.route('/<int:listingId>/reviews/<int:reviewId>/', methods=["DELETE"])
@login_required
def deleteReview(listingId, reviewId):
    review = Review.query.get(reviewId)
    db.session.delete(review)
    db.session.commit()
    return {"success": "true"}
