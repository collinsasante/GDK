import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEnrollment } from '../../context/EnrollmentContext';

const CheckoutMain = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { enrollInLesson, isEnrolled } = useEnrollment();

    const lessonId = searchParams.get('lessonId');
    const lessonTitle = searchParams.get('lessonTitle');
    const price = searchParams.get('price');

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [processing, setProcessing] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(`/login?redirect=/checkout?lessonId=${lessonId}&lessonTitle=${encodeURIComponent(lessonTitle)}&price=${price}`);
        }

        if (isAuthenticated && isEnrolled(user.id, lessonId)) {
            navigate('/my-lessons');
        }
    }, [isAuthenticated, navigate, lessonId, lessonTitle, price, isEnrolled, user]);

    const handleEnroll = (e) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            enrollInLesson(user.id, lessonId, lessonTitle, price);
            setProcessing(false);
            navigate('/my-lessons?enrolled=true');
        }, 1500);
    };

    if (!lessonId || !lessonTitle || !price) {
        return (
            <div className="react-wrapper">
                <div className="react-wrapper-inner" style={{ padding: '100px 0', textAlign: 'center' }}>
                    <div className="container">
                        <h2>Invalid Checkout</h2>
                        <p>Missing lesson information. Please go back and try again.</p>
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
                            Browse Lessons
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="react-wrapper">
            <div className="react-wrapper-inner" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                padding: '40px',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
                            }}>
                                <h2 style={{ marginBottom: '30px' }}>Complete Your Enrollment</h2>

                                <form onSubmit={handleEnroll}>
                                    <div style={{ marginBottom: '30px' }}>
                                        <h4 style={{ marginBottom: '15px' }}>Payment Method</h4>
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <label style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '15px 20px',
                                                border: paymentMethod === 'card' ? '2px solid #2196F3' : '2px solid #ddd',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                flex: 1
                                            }}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="card"
                                                    checked={paymentMethod === 'card'}
                                                    onChange={() => setPaymentMethod('card')}
                                                    style={{ marginRight: '10px' }}
                                                />
                                                Credit/Debit Card
                                            </label>
                                            <label style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '15px 20px',
                                                border: paymentMethod === 'paypal' ? '2px solid #2196F3' : '2px solid #ddd',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                flex: 1
                                            }}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="paypal"
                                                    checked={paymentMethod === 'paypal'}
                                                    onChange={() => setPaymentMethod('paypal')}
                                                    style={{ marginRight: '10px' }}
                                                />
                                                PayPal
                                            </label>
                                        </div>
                                    </div>

                                    {paymentMethod === 'card' && (
                                        <div style={{ marginBottom: '30px' }}>
                                            <h4 style={{ marginBottom: '15px' }}>Card Information</h4>
                                            <div style={{ marginBottom: '15px' }}>
                                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Card Number</label>
                                                <input
                                                    type="text"
                                                    placeholder="1234 5678 9012 3456"
                                                    value={cardNumber}
                                                    onChange={(e) => setCardNumber(e.target.value)}
                                                    required
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '4px',
                                                        fontSize: '16px'
                                                    }}
                                                />
                                            </div>
                                            <div style={{ marginBottom: '15px' }}>
                                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Cardholder Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={cardName}
                                                    onChange={(e) => setCardName(e.target.value)}
                                                    required
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '4px',
                                                        fontSize: '16px'
                                                    }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', gap: '15px' }}>
                                                <div style={{ flex: 1 }}>
                                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Expiry Date</label>
                                                    <input
                                                        type="text"
                                                        placeholder="MM/YY"
                                                        value={expiryDate}
                                                        onChange={(e) => setExpiryDate(e.target.value)}
                                                        required
                                                        style={{
                                                            width: '100%',
                                                            padding: '12px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '4px',
                                                            fontSize: '16px'
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>CVV</label>
                                                    <input
                                                        type="text"
                                                        placeholder="123"
                                                        value={cvv}
                                                        onChange={(e) => setCvv(e.target.value)}
                                                        required
                                                        maxLength="4"
                                                        style={{
                                                            width: '100%',
                                                            padding: '12px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '4px',
                                                            fontSize: '16px'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            backgroundColor: processing ? '#ccc' : '#4CAF50',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            cursor: processing ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {processing ? 'Processing...' : `Enroll Now - ${price}`}
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div style={{
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                padding: '30px',
                                position: 'sticky',
                                top: '20px'
                            }}>
                                <h4 style={{ marginBottom: '20px' }}>Order Summary</h4>
                                <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #ddd' }}>
                                    <h5 style={{ marginBottom: '10px', fontSize: '16px' }}>{lessonTitle}</h5>
                                    <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>Gospel Piano Lesson</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span>Price:</span>
                                    <strong>{price}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px', borderTop: '2px solid #ddd' }}>
                                    <strong>Total:</strong>
                                    <strong style={{ fontSize: '20px', color: '#4CAF50' }}>{price}</strong>
                                </div>
                                <div style={{
                                    marginTop: '20px',
                                    padding: '15px',
                                    backgroundColor: 'white',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    lineHeight: '1.6'
                                }}>
                                    <strong>What's Included:</strong>
                                    <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                                        <li>Lifetime access to lesson content</li>
                                        <li>Video lessons and practice materials</li>
                                        <li>Certificate of completion</li>
                                        <li>Access to student community</li>
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
