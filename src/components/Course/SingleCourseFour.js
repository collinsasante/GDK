import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEnrollment } from '../../context/EnrollmentContext';
import { useCart } from '../../context/CartContext';

import courseImg1 from '../../assets/images/course/1.png';

const SingleCourseFour = (props) => {
    const { itemClass, courseID, courseImg, courseTitle, courseName, courseAuthor, courseAuthorImg, courseLesson, courseEnrolled, coursePrice, courseReview, courseRegularPrice } = props;
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { isEnrolled } = useEnrollment();
    const { addToCart, isInCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart();
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();

        if (enrolled) {
            navigate('/my-lessons');
            return;
        }

        const courseData = {
            id: courseID,
            title: courseTitle,
            image: courseImg,
            price: coursePrice,
            regularPrice: courseRegularPrice,
            author: courseAuthor,
            review: courseReview,
            lesson: courseLesson
        };

        const result = addToCart(courseData);
        if (result.success) {
            showNotification('Course added to cart!', 'success');
        } else {
            showNotification(result.message, 'info');
        }
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();

        const courseData = {
            id: courseID,
            title: courseTitle,
            image: courseImg,
            price: coursePrice,
            regularPrice: courseRegularPrice,
            author: courseAuthor,
            review: courseReview
        };

        if (isInWishlist(courseID)) {
            const result = removeFromWishlist(courseID);
            showNotification(result.message, 'info');
        } else {
            const result = addToWishlist(courseData);
            if (result.success) {
                showNotification('Added to wishlist!', 'success');
            } else {
                showNotification(result.message, 'info');
            }
        }
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate(`/login?redirect=/checkout?lessonId=${courseID}&lessonTitle=${encodeURIComponent(courseTitle)}&price=${coursePrice}`);
        } else if (enrolled) {
            navigate('/my-lessons');
        } else {
            navigate(`/checkout?lessonId=${courseID}&lessonTitle=${encodeURIComponent(courseTitle)}&price=${coursePrice}`);
        }
    };

    const enrolled = isAuthenticated && user && isEnrolled(user.id, courseID);
    const inCart = isInCart(courseID);
    const inWishlist = isInWishlist(courseID);

	return(
        <div className={itemClass ? itemClass : 'inner-course'} style={{ position: 'relative' }}>
            {/* Notification Toast */}
            {notification && (
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: notification.type === 'success' ? '#4CAF50' : '#2196F3',
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    zIndex: 1000,
                    animation: 'slideIn 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                    {notification.message}
                </div>
            )}

            <div className="case-img" style={{ position: 'relative' }}>
                <Link to="#" className="cate-w">{courseName ? courseName : 'Web Design'}</Link>
                <img src={courseImg ? require(`../../assets/images/course/${courseImg}`) : require(`../../assets/images/course/${courseImg1}`)} alt="Course" />

                {/* Wishlist Button Overlay */}
                <button
                    onClick={handleWishlistToggle}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        transition: 'all 0.2s',
                        zIndex: 2
                    }}
                    title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill={inWishlist ? "#dc3545" : "none"}
                        stroke={inWishlist ? "#dc3545" : "#6c757d"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div className="case-content">
                <ul className="meta-course">
                    <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> {courseReview} review </li>
                    <li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> {courseEnrolled ? courseEnrolled : '44'} Students </li>
                </ul>
                <h4 className="case-title">
                    <Link to={`/course/${courseID}`}>
                        {courseTitle ? courseTitle : 'The Most Complete Design Thinking Course On The Market.'}
                    </Link>
                </h4>
                <div className="react__user">
                    <img src={require(`../../assets/images/course/${courseAuthorImg}`)} alt="user" /> {courseAuthor}
                </div>
                <ul className="react-ratings">
                    <li className="react-book"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>{courseLesson ? courseLesson : '4'} Lessons</li>
                    <li className="price">{coursePrice ? coursePrice : '$34.00'}</li>
                </ul>

                {/* E-commerce Action Buttons */}
                <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {enrolled ? (
                        <button
                            onClick={handleBuyNow}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '15px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            ✓ View Your Lesson
                        </button>
                    ) : (
                        <>
                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: inCart ? '#28a745' : '#0d6efd',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                {inCart ? 'In Cart' : 'Add to Cart'}
                            </button>

                            {/* Buy Now Button */}
                            <button
                                onClick={handleBuyNow}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: 'transparent',
                                    color: '#0d6efd',
                                    border: '2px solid #0d6efd',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = '#0d6efd';
                                    e.target.style.color = 'white';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#0d6efd';
                                }}
                            >
                                Buy Now
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
	)
}

export default SingleCourseFour