import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEnrollment } from '../../context/EnrollmentContext';
import { useCart } from '../../context/CartContext';

const CheckoutMain = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { enrollInLesson, isEnrolled } = useEnrollment();
    const { cartItems, clearCart } = useCart();

    // Single item checkout (from "Buy Now")
    const lessonId = searchParams.get('lessonId');
    const lessonTitle = searchParams.get('lessonTitle');
    const price = searchParams.get('price');

    const [paymentMethod, setPaymentMethod] = useState('mobilemoney');
    const [processing, setProcessing] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponApplied, setCouponApplied] = useState(false);

    // Payment Information (replace with your actual details)
    const paymentInfo = {
        mobileMoney: {
            name: 'MTN Mobile Money', // Replace with your mobile money provider
            number: '+233 XX XXX XXXX' // Replace with your mobile money number
        },
        bank: {
            name: 'Your Bank Name', // Replace with your bank name
            accountNumber: 'XXXX XXXX XXXX', // Replace with your account number
            accountName: 'Gospel Keys Demystified' // Replace with account holder name
        }
    };

    // Determine if this is cart checkout or single item checkout
    const isCartCheckout = !lessonId && cartItems.length > 0;
    const isSingleCheckout = lessonId && lessonTitle && price;

    // Coupon codes (hardcoded for demo)
    const validCoupons = {
        'GOSPEL10': 10,  // 10% off
        'SAVE20': 20,    // 20% off
        'WELCOME15': 15  // 15% off
    };

    useEffect(() => {
        if (!isAuthenticated) {
            if (lessonId) {
                navigate(`/login?redirect=/checkout?lessonId=${lessonId}&lessonTitle=${encodeURIComponent(lessonTitle)}&price=${price}`);
            } else {
                navigate('/login?redirect=/checkout');
            }
        }

        if (isAuthenticated && isSingleCheckout && isEnrolled(user.id, lessonId)) {
            navigate('/my-lessons');
        }
    }, [isAuthenticated, navigate, lessonId, lessonTitle, price, isEnrolled, user, isSingleCheckout]);

    const applyCoupon = () => {
        const code = couponCode.toUpperCase();
        if (validCoupons[code]) {
            setDiscount(validCoupons[code]);
            setCouponApplied(true);
        } else {
            alert('Invalid coupon code');
            setDiscount(0);
            setCouponApplied(false);
        }
    };

    const removeCoupon = () => {
        setCouponCode('');
        setDiscount(0);
        setCouponApplied(false);
    };

    const calculateTotal = () => {
        let subtotal = 0;

        if (isCartCheckout) {
            subtotal = cartItems.reduce((total, item) => {
                return total + parseFloat(item.price.replace('$', ''));
            }, 0);
        } else if (isSingleCheckout) {
            subtotal = parseFloat(price.replace('$', ''));
        }

        const discountAmount = (subtotal * discount) / 100;
        return {
            subtotal: subtotal.toFixed(2),
            discount: discountAmount.toFixed(2),
            total: (subtotal - discountAmount).toFixed(2)
        };
    };

    const handleEnroll = (e) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            if (isCartCheckout) {
                // Enroll in all cart items
                cartItems.forEach(item => {
                    enrollInLesson(user.id, item.id, item.title, item.price);
                });
                clearCart();
            } else if (isSingleCheckout) {
                // Enroll in single item
                enrollInLesson(user.id, lessonId, lessonTitle, price);
            }

            setProcessing(false);
            navigate('/my-lessons?enrolled=true');
        }, 1500);
    };

    // Invalid checkout state
    if (!isCartCheckout && !isSingleCheckout) {
        return (
            <div className="react-wrapper">
                <div className="react-wrapper-inner" style={{ padding: '100px 0', textAlign: 'center' }}>
                    <div className="container">
                        <h2>Your Cart is Empty</h2>
                        <p>Add some courses to your cart to proceed with checkout.</p>
                        <button
                            onClick={() => navigate('/course')}
                            style={{
                                padding: '12px 30px',
                                backgroundColor: '#2196F3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginTop: '20px'
                            }}
                        >
                            Browse Courses
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const totals = calculateTotal();

    return (
        <div className="react-wrapper">
            <div className="react-wrapper-inner" style={{ padding: '80px 0', backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                padding: '40px',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                                marginBottom: '20px'
                            }}>
                                <h2 style={{ marginBottom: '30px' }}>Complete Your Enrollment</h2>

                                <form onSubmit={handleEnroll}>
                                    <div style={{ marginBottom: '30px' }}>
                                        <h4 style={{ marginBottom: '15px' }}>Payment Method</h4>
                                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                            <label style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '15px 20px',
                                                border: paymentMethod === 'mobilemoney' ? '2px solid #0d6efd' : '2px solid #ddd',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                flex: '1 1 45%',
                                                backgroundColor: paymentMethod === 'mobilemoney' ? '#f0f7ff' : 'white'
                                            }}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="mobilemoney"
                                                    checked={paymentMethod === 'mobilemoney'}
                                                    onChange={() => setPaymentMethod('mobilemoney')}
                                                    style={{ marginRight: '10px' }}
                                                />
                                                Mobile Money
                                            </label>
                                            <label style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '15px 20px',
                                                border: paymentMethod === 'bank' ? '2px solid #0d6efd' : '2px solid #ddd',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                flex: '1 1 45%',
                                                backgroundColor: paymentMethod === 'bank' ? '#f0f7ff' : 'white'
                                            }}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="bank"
                                                    checked={paymentMethod === 'bank'}
                                                    onChange={() => setPaymentMethod('bank')}
                                                    style={{ marginRight: '10px' }}
                                                />
                                                Bank Transfer
                                            </label>
                                        </div>
                                    </div>

                                    {/* Mobile Money Payment Details */}
                                    {paymentMethod === 'mobilemoney' && (
                                        <div style={{
                                            marginBottom: '30px',
                                            padding: '25px',
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: '8px',
                                            border: '2px solid #0d6efd'
                                        }}>
                                            <h4 style={{ marginBottom: '20px', color: '#0d6efd', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                                                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                                                </svg>
                                                Mobile Money Payment Details
                                            </h4>
                                            <div style={{ fontSize: '16px', lineHeight: '1.8' }}>
                                                <div style={{ marginBottom: '15px' }}>
                                                    <strong style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>Provider:</strong>
                                                    <span style={{ fontSize: '18px', color: '#212529', fontWeight: '600' }}>{paymentInfo.mobileMoney.name}</span>
                                                </div>
                                                <div style={{ marginBottom: '15px' }}>
                                                    <strong style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>Number:</strong>
                                                    <span style={{
                                                        fontSize: '20px',
                                                        color: '#0d6efd',
                                                        fontWeight: '700',
                                                        letterSpacing: '1px',
                                                        display: 'inline-block',
                                                        padding: '8px 15px',
                                                        backgroundColor: 'white',
                                                        borderRadius: '6px',
                                                        border: '1px solid #dee2e6'
                                                    }}>
                                                        {paymentInfo.mobileMoney.number}
                                                    </span>
                                                </div>
                                                <div style={{
                                                    marginTop: '20px',
                                                    padding: '15px',
                                                    backgroundColor: '#fff3cd',
                                                    borderLeft: '4px solid #ffc107',
                                                    borderRadius: '4px'
                                                }}>
                                                    <p style={{ margin: 0, fontSize: '14px', color: '#856404' }}>
                                                        <strong>Instructions:</strong><br/>
                                                        1. Send <strong>${totals.total}</strong> to the number above<br/>
                                                        2. Click "Complete Enrollment" below<br/>
                                                        3. We'll verify your payment and activate your access
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Bank Transfer Payment Details */}
                                    {paymentMethod === 'bank' && (
                                        <div style={{
                                            marginBottom: '30px',
                                            padding: '25px',
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: '8px',
                                            border: '2px solid #0d6efd'
                                        }}>
                                            <h4 style={{ marginBottom: '20px', color: '#0d6efd', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                                    <line x1="1" y1="10" x2="23" y2="10"></line>
                                                </svg>
                                                Bank Transfer Details
                                            </h4>
                                            <div style={{ fontSize: '16px', lineHeight: '1.8' }}>
                                                <div style={{ marginBottom: '15px' }}>
                                                    <strong style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>Bank Name:</strong>
                                                    <span style={{ fontSize: '18px', color: '#212529', fontWeight: '600' }}>{paymentInfo.bank.name}</span>
                                                </div>
                                                <div style={{ marginBottom: '15px' }}>
                                                    <strong style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>Account Name:</strong>
                                                    <span style={{ fontSize: '18px', color: '#212529', fontWeight: '600' }}>{paymentInfo.bank.accountName}</span>
                                                </div>
                                                <div style={{ marginBottom: '15px' }}>
                                                    <strong style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>Account Number:</strong>
                                                    <span style={{
                                                        fontSize: '20px',
                                                        color: '#0d6efd',
                                                        fontWeight: '700',
                                                        letterSpacing: '2px',
                                                        display: 'inline-block',
                                                        padding: '8px 15px',
                                                        backgroundColor: 'white',
                                                        borderRadius: '6px',
                                                        border: '1px solid #dee2e6'
                                                    }}>
                                                        {paymentInfo.bank.accountNumber}
                                                    </span>
                                                </div>
                                                <div style={{
                                                    marginTop: '20px',
                                                    padding: '15px',
                                                    backgroundColor: '#fff3cd',
                                                    borderLeft: '4px solid #ffc107',
                                                    borderRadius: '4px'
                                                }}>
                                                    <p style={{ margin: 0, fontSize: '14px', color: '#856404' }}>
                                                        <strong>Instructions:</strong><br/>
                                                        1. Transfer <strong>${totals.total}</strong> to the account above<br/>
                                                        2. Click "Complete Enrollment" below<br/>
                                                        3. We'll verify your payment and activate your access
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        style={{
                                            width: '100%',
                                            padding: '16px',
                                            backgroundColor: processing ? '#ccc' : '#4CAF50',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            cursor: processing ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {processing ? 'Processing Payment...' : `Complete Enrollment - $${totals.total}`}
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                padding: '30px',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                                position: 'sticky',
                                top: '20px'
                            }}>
                                <h4 style={{ marginBottom: '25px', fontSize: '20px', fontWeight: '700' }}>Order Summary</h4>

                                {/* Items List */}
                                <div style={{ marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                                    {isCartCheckout ? (
                                        cartItems.map((item, index) => (
                                            <div key={item.id} style={{
                                                marginBottom: '15px',
                                                paddingBottom: '15px',
                                                borderBottom: index < cartItems.length - 1 ? '1px solid #e9ecef' : 'none'
                                            }}>
                                                <h6 style={{ marginBottom: '5px', fontSize: '15px', fontWeight: '600' }}>{item.title}</h6>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6c757d' }}>
                                                    <span>{item.lesson} Lessons</span>
                                                    <strong style={{ color: '#0d6efd' }}>{item.price}</strong>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e9ecef' }}>
                                            <h6 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: '600' }}>{lessonTitle}</h6>
                                            <p style={{ color: '#6c757d', margin: 0, fontSize: '14px' }}>Gospel Piano Lesson</p>
                                        </div>
                                    )}
                                </div>

                                {/* Coupon Code */}
                                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e9ecef' }}>
                                    <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', fontSize: '14px' }}>
                                        Have a coupon?
                                    </label>
                                    {!couponApplied ? (
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <input
                                                type="text"
                                                placeholder="Enter code"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                style={{
                                                    flex: 1,
                                                    padding: '10px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    fontSize: '14px'
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={applyCoupon}
                                                style={{
                                                    padding: '10px 20px',
                                                    backgroundColor: '#0d6efd',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    ) : (
                                        <div style={{
                                            padding: '10px 15px',
                                            backgroundColor: '#d4edda',
                                            border: '1px solid #c3e6cb',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{ color: '#155724', fontSize: '14px', fontWeight: '600' }}>
                                                {couponCode} applied! ({discount}% off)
                                            </span>
                                            <button
                                                type="button"
                                                onClick={removeCoupon}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#155724',
                                                    cursor: 'pointer',
                                                    fontSize: '18px',
                                                    padding: '0 5px'
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                    <p style={{ marginTop: '8px', fontSize: '12px', color: '#6c757d', fontStyle: 'italic' }}>
                                        Try: GOSPEL10, SAVE20, WELCOME15
                                    </p>
                                </div>

                                {/* Price Breakdown */}
                                <div style={{ marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <span style={{ color: '#6c757d' }}>Subtotal:</span>
                                        <span>${totals.subtotal}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#28a745' }}>
                                            <span>Discount ({discount}%):</span>
                                            <span>-${totals.discount}</span>
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px', borderTop: '2px solid #dee2e6', marginTop: '10px' }}>
                                        <strong style={{ fontSize: '18px' }}>Total:</strong>
                                        <strong style={{ fontSize: '24px', color: '#0d6efd' }}>${totals.total}</strong>
                                    </div>
                                </div>

                                {/* What's Included */}
                                <div style={{
                                    marginTop: '25px',
                                    padding: '20px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    lineHeight: '1.6'
                                }}>
                                    <strong style={{ display: 'block', marginBottom: '12px' }}>What's Included:</strong>
                                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                        <li>Lifetime access to all lessons</li>
                                        <li>Video lessons & practice materials</li>
                                        <li>Certificate of completion</li>
                                        <li>Student community access</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutMain;
