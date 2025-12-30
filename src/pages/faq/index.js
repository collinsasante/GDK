import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollToTop from '../../components/ScrollTop';
import FaqMain from './FaqMain';

const FaqPage = () => {
    return (
        <>
            <Header />
            <FaqMain />
            <ScrollToTop />
            <Footer />
        </>
    );
}

export default FaqPage;
