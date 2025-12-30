import React from 'react';
import Header from '../../components/Header';
import FooterTwo from '../../components/Footer/FooterTwo';
import CheckoutMain from './CheckoutMain';
import ScrollToTop from '../../components/ScrollTop';

import footerLogo from '../../assets/images/logos/footer-logo.png';

const Checkout = () => {
    return (
        <>
            <Header
                parentMenu='course'
                topbarEnable='enable'
            />
            <CheckoutMain />
            <ScrollToTop />
            <FooterTwo footerLogo={footerLogo} hideCta={true} />
        </>
    );
};

export default Checkout;
