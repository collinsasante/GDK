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

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!acceptTerms) {
            setError('You must accept the Terms & Conditions');
            return;
        }

        setLoading(true);

        const result = signup(email, username, password, confirmPassword, adminCode);

        if (result.success) {
            // Redirect to home page after successful signup
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
                                    <span className="back-or"> ........ or Login with ........ </span>
                                    <ul className="social-links">
                                        <li><a href="#"><span aria-hidden="true" className="social_facebook"></span></a></li>
                                        <li><a href="#"><span aria-hidden="true" className="social_twitter"></span></a></li>
                                    </ul>
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