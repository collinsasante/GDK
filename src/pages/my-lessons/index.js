import React from 'react';
import Header from '../../components/Header';
import FooterTwo from '../../components/Footer/FooterTwo';
import MyLessonsMain from './MyLessonsMain';
import ScrollToTop from '../../components/ScrollTop';

import footerLogo from '../../assets/images/logos/footer-logo.png';

const MyLessons = () => {
    return (
        <>
            <Header
                parentMenu='course'
                topbarEnable='enable'
            />
            <MyLessonsMain />
            <ScrollToTop />
            <FooterTwo footerLogo={footerLogo} />
        </>
    );
};

export default MyLessons;
