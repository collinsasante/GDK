import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './ShoppingCart.scss';

const ShoppingCart = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, getCartTotal, getCartCount, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!isAuthenticated) {
            navigate('/login?redirect=/checkout');
        } else {
            navigate('/checkout');
        }
        onClose();
    };

    const handleRemoveItem = (courseId) => {
        removeFromCart(courseId);
    };

    const cartTotal = getCartTotal();
    const cartCount = getCartCount();

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div className="cart-overlay" onClick={onClose}></div>

            {/* Cart Sidebar */}
            <div className={`shopping-cart-sidebar ${isOpen ? 'active' : ''}`}>
                <div className="cart-header">
                    <h3>Shopping Cart ({cartCount})</h3>
                    <button className="close-cart" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="cart-body">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            <p>Your cart is empty</p>
                            <Link to="/course" className="btn btn-primary" onClick={onClose}>
                                Browse Courses
                            </Link>
                        </div>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="item-image">
                                        <img
                                            src={require(`../../assets/images/course/${item.image}`)}
                                            alt={item.title}
                                        />
                                    </div>
                                    <div className="item-details">
                                        <Link
                                            to={`/course/${item.id}`}
                                            className="item-title"
                                            onClick={onClose}
                                        >
                                            {item.title}
                                        </Link>
                                        <div className="item-author">by {item.author}</div>
                                        <div className="item-meta">
                                            <span className="item-lessons">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                </svg>
                                                {item.lesson} Lessons
                                            </span>
                                            <span className="item-rating">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                </svg>
                                                {item.review}
                                            </span>
                                        </div>
                                        <div className="item-price-section">
                                            <span className="item-price">{item.price}</span>
                                            {item.regularPrice && (
                                                <span className="item-regular-price">{item.regularPrice}</span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        className="remove-item"
                                        onClick={() => handleRemoveItem(item.id)}
                                        title="Remove from cart"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-summary">
                            <div className="summary-row">
                                <span>Subtotal:</span>
                                <span className="subtotal-amount">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total:</span>
                                <span className="total-amount">${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <button
                            className="btn btn-primary btn-checkout"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                        <button
                            className="btn btn-link btn-continue"
                            onClick={onClose}
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ShoppingCart;
