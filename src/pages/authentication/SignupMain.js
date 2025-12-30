import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignupMain = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [adminCode, setAdminCode] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!acceptTerms) {
            setError('You must accept the Terms & Conditions');
            return;
        }

        setLoading(true);

        const result = await signup(email, username, password, confirmPassword, adminCode);

        if (result.success) {
            // Redirect to home page after successful signup
            navigate('/');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    const handleGoogleSignUp = async () => {
        setError('');
        setLoading(true);

        const result = await loginWithGoogle();

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <>
            <div className="react-login-page react-signup-page pt---120 pb---120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="login-right-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="login-top">
                                        <h3>Join Gospel Keys Demystified</h3>
                                        <p>Already have an account? <Link to="/login">Log in</Link></p>
                                    </div>

                                    {error && (
                                        <div style={{
                                            padding: '12px',
                                            marginBottom: '20px',
                                            backgroundColor: '#fee',
                                            color: '#c33',
                                            borderRadius: '4px',
                                            border: '1px solid #fcc'
                                        }}>
                                            {error}
                                        </div>
                                    )}

                                    <p>
                                        <label>Email</label>
                                        <input
                                            placeholder="Email"
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </p>
                                    <p>
                                        <label>User Name</label>
                                        <input
                                            placeholder="User Name"
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </p>
                                    <p>
                                        <label>Password</label>
                                        <input
                                            placeholder="Password"
                                            type="password"
                                            id="pass"
                                            name="pass"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </p>
                                    <p>
                                        <label>Confirm Password</label>
                                        <input
                                            placeholder="Confirm Password"
                                            type="password"
                                            id="confirmPass"
                                            name="confirmPass"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </p>
                                    <p>
                                        <label>Admin Code (Optional)</label>
                                        <input
                                            placeholder="Enter admin code if you have one"
                                            type="text"
                                            id="adminCode"
                                            name="adminCode"
                                            value={adminCode}
                                            onChange={(e) => setAdminCode(e.target.value)}
                                        />
                                        <small style={{ color: '#666', fontSize: '12px', display: 'block', marginTop: '5px' }}>
                                            Leave blank to join as a piano student. Instructors should enter their admin code.
                                        </small>
                                    </p>
                                    <div className="back-check-box">
                                        <input
                                            type="checkbox"
                                            id="box-1"
                                            checked={acceptTerms}
                                            onChange={(e) => setAcceptTerms(e.target.checked)}
                                        /> I agree to the <em>Terms & Conditions</em>
                                        <p></p>
                                    </div>
                                    <button
                                        type="submit"
                                        id="button"
                                        name="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Registering...' : 'Register'} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </button>
                                    <span className="back-or"> ........ or Sign up with ........ </span>
                                    <button
                                        type="button"
                                        onClick={handleGoogleSignUp}
                                        disabled={loading}
                                        style={{
                                            width: '100%',
                                            padding: '12px 24px',
                                            backgroundColor: '#fff',
                                            color: '#444',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            marginTop: '15px',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!loading) {
                                                e.currentTarget.style.backgroundColor = '#f8f8f8';
                                                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#fff';
                                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                                        }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                                            <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                                            <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9.001c0 1.452.348 2.827.957 4.041l3.007-2.332z" fill="#FBBC05"/>
                                            <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
                                        </svg>
                                        Sign up with Google
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}


export default SignupMain;