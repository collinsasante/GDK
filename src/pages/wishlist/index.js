import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WishlistMain from './WishlistMain';

const Wishlist = () => {
    return (
        <>
            <Header parentMenu="wishlist" />
            <WishlistMain />
            <Footer />
        </>
    );
};

export default Wishlist;
