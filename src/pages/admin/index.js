import { Navigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import AdminMain from './AdminMain';
import ScrollToTop from '../../components/ScrollTop';
import { useAuth } from '../../context/AuthContext';

import Logo from '../../assets/images/logos/logo2.png';

const Admin = () => {
    const { isAdmin, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <Header
                parentMenu='admin'
                menuCategoryEnable='enable'
                headerNormalLogo={Logo}
                headerStickyLogo={Logo}
            />

            <div className="react-wrapper">
                <div className="react-wrapper-inner">
                    <Breadcrumb
                        pageTitle="Admin Dashboard"
                    />

                    <AdminMain />

                    <ScrollToTop />
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Admin;
