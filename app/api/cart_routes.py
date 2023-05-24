from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review, Cart_listings
from .auth_routes import validation_errors_to_error_messages
import json
cart_routes = Blueprint('carts', __name__)


@cart_routes.route('/', methods=['POST'])
@login_required
def postCartItem():
    listing = request.get_json()
    cart = Cart_listings(
        user_id=current_user.id,
        listing_id=listing["id"]
    )
    db.session.add(cart)
    db.session.commit()
    return {"success": True}


@cart_routes.route('/<int:listingId>/', methods=['PUT'])
@login_required
def removeCartItem(listingId):
    cart = Cart_listings.query.filter(
        Cart_listings.user_id == current_user.id, Cart_listings.listing_id == listingId).first()
    db.session.delete(cart)
    db.session.commit()
    return {"success": True}


@cart_routes.route('/', methods=['DELETE'])
@login_required
def removeCartItems():
    cart = Cart_listings.query.filter(
        Cart_listings.user_id == current_user.id)
    for listing in cart:
        db.session.delete(listing)

    db.session.commit()
    return {"success": True}
