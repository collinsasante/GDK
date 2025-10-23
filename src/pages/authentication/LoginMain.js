import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginMain = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = login(email, password);

        if (result.success) {
            // Redirect to home page after successful login
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
                                        <h3>Welcome Back to Gospel Keys</h3>
                                        <p>Don't have an account yet? <Link to="/signup">Start Your Piano Journey</Link></p>
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
                                    <div className="back-check-box">
                                        <input
                                            type="checkbox"
                                            id="box-1"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        /> Remember me
                                        <p>Forget password?</p>
                                    </div>
                                    <button
                                        type="submit"
                                        id="button"
                                        name="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Logging in...' : 'LogIn'} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
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


export default LoginMain;