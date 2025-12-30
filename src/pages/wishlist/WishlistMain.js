import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useEnrollment } from '../../context/EnrollmentContext';

const WishlistMain = () => {
    const { wishlist, removeFromWishlist, addToCart, moveToCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { isEnrolled } = useEnrollment();

    const handleMoveToCart = (course) => {
        const result = moveToCart(course.id);
        if (result.success) {
            // Optionally show notification
        }
    };

    const handleAddToCart = (course) => {
        const result = addToCart(course);
        if (result.success) {
            // Optionally show notification
        }
    };

    const handleRemove = (courseId) => {
        removeFromWishlist(courseId);
    };

    return (
        <div className="react-wrapper">
            <div className="react-wrapper-inner">
                {/* Breadcrumb */}
                <div className="breadcrumbs-section" style={{ padding: '40px 0', backgroundColor: '#f8f9fa' }}>
                    <div className="container">
                        <div className="breadcrumbs-area">
                            <h1 style={{ marginBottom: '10px', fontSize: '32px' }}>My Wishlist</h1>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '8px' }}>
                                <li><Link to="/" style={{ color: '#0d6efd', textDecoration: 'none' }}>Home</Link></li>
                                <li style={{ color: '#6c757d' }}>/</li>
                                <li style={{ color: '#6c757d' }}>Wishlist</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Wishlist Content */}
                <div className="react-wishlist pt-100 pb-100">
                    <div className="container">
                        {wishlist.length === 0 ? (
                            <div className="empty-wishlist text-center" style={{ padding: '80px 20px' }}>
                                <div style={{ marginBottom: '30px' }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="120"
                                        height="120"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#dee2e6"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ margin: '0 auto' }}
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </div>
                                <h3 style={{ marginBottom: '15px', color: '#1a1a1a' }}>Your Wishlist is Empty</h3>
                                <p style={{ color: '#6c757d', marginBottom: '30px', fontSize: '16px' }}>
                                    Save your favorite courses to your wishlist and access them easily later!
                                </p>
                                <Link
                                    to="/course"
                                    className="btn btn-primary"
                                    style={{
                                        padding: '14px 35px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        borderRadius: '6px',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Browse Courses
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="wishlist-header" style={{ marginBottom: '30px' }}>
                                    <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '10px' }}>
                                        My Wishlist ({wishlist.length} {wishlist.length === 1 ? 'Course' : 'Courses'})
                                    </h2>
                                    <p style={{ color: '#6c757d' }}>
                                        Courses you've saved for later
                                    </p>
                                </div>

                                <div className="wishlist-items">
                                    {wishlist.map((course) => {
                                        const enrolled = isAuthenticated && user && isEnrolled(user.id, course.id);

                                        return (
                                            <div
                                                key={course.id}
                                                className="wishlist-item"
                                                style={{
                                                    display: 'flex',
                                                    gap: '20px',
                                                    padding: '20px',
                                                    background: '#fff',
                                                    borderRadius: '8px',
                                                    marginBottom: '20px',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                    transition: 'all 0.2s',
                                                    position: 'relative'
                                                }}
                                            >
                                                {/* Course Image */}
                                                <div
                                                    className="wishlist-item-image"
                                                    style={{
                                                        width: '200px',
                                                        flexShrink: 0,
                                                        borderRadius: '6px',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    <Link to={`/course/${course.id}`}>
                                                        <img
                                                            src={require(`../../assets/images/course/${course.image}`)}
                                                            alt={course.title}
                                                            style={{
                                                                width: '100%',
                                                                height: '140px',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                    </Link>
                                                </div>

                                                {/* Course Details */}
                                                <div className="wishlist-item-details" style={{ flex: 1 }}>
                                                    <Link
                                                        to={`/course/${course.id}`}
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: '#1a1a1a'
                                                        }}
                                                    >
                                                        <h4
                                                            style={{
                                                                fontSize: '20px',
                                                                fontWeight: '600',
                                                                marginBottom: '10px',
                                                                lineHeight: '1.4'
                                                            }}
                                                        >
                                                            {course.title}
                                                        </h4>
                                                    </Link>

                                                    <div
                                                        className="course-meta"
                                                        style={{
                                                            display: 'flex',
                                                            gap: '20px',
                                                            marginBottom: '12px',
                                                            fontSize: '14px',
                                                            color: '#6c757d'
                                                        }}
                                                    >
                                                        <span>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                style={{ verticalAlign: 'middle', marginRight: '5px' }}
                                                            >
                                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                            </svg>
                                                            {course.review} Rating
                                                        </span>
                                                        <span>By {course.author}</span>
                                                    </div>

                                                    <div className="course-price" style={{ marginBottom: '15px' }}>
                                                        <span
                                                            style={{
                                                                fontSize: '24px',
                                                                fontWeight: '700',
                                                                color: '#0d6efd'
                                                            }}
                                                        >
                                                            {course.price}
                                                        </span>
                                                        {course.regularPrice && (
                                                            <span
                                                                style={{
                                                                    fontSize: '16px',
                                                                    color: '#6c757d',
                                                                    textDecoration: 'line-through',
                                                                    marginLeft: '10px'
                                                                }}
                                                            >
                                                                {course.regularPrice}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        {enrolled ? (
                                                            <Link
                                                                to="/my-lessons"
                                                                className="btn btn-success"
                                                                style={{
                                                                    padding: '10px 24px',
                                                                    fontSize: '14px',
                                                                    fontWeight: '600',
                                                                    borderRadius: '6px',
                                                                    textDecoration: 'none'
                                                                }}
                                                            >
                                                                View Lesson
                                                            </Link>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleMoveToCart(course)}
                                                                className="btn btn-primary"
                                                                style={{
                                                                    padding: '10px 24px',
                                                                    fontSize: '14px',
                                                                    fontWeight: '600',
                                                                    borderRadius: '6px',
                                                                    border: 'none'
                                                                }}
                                                            >
                                                                Move to Cart
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => handleRemove(course.id)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '15px',
                                                        right: '15px',
                                                        background: 'transparent',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        padding: '8px',
                                                        color: '#6c757d',
                                                        transition: 'color 0.2s'
                                                    }}
                                                    title="Remove from wishlist"
                                                    onMouseOver={(e) => (e.target.style.color = '#dc3545')}
                                                    onMouseOut={(e) => (e.target.style.color = '#6c757d')}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Continue Shopping */}
                                <div className="text-center" style={{ marginTop: '40px' }}>
                                    <Link
                                        to="/course"
                                        className="btn btn-outline-primary"
                                        style={{
                                            padding: '12px 30px',
                                            fontSize: '15px',
                                            fontWeight: '600',
                                            borderRadius: '6px',
                                            textDecoration: 'none',
                                            border: '2px solid #0d6efd'
                                        }}
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistMain;
