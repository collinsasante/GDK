import React, { createContext, useState, useContext, useEffect } from 'react';
import { storageService } from '../services/storageService';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    // Load cart and wishlist from localStorage on mount
    useEffect(() => {
        const savedCart = storageService.get('shoppingCart', []);
        const savedWishlist = storageService.get('wishlist', []);
        setCartItems(savedCart);
        setWishlist(savedWishlist);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        storageService.set('shoppingCart', cartItems);
    }, [cartItems]);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        storageService.set('wishlist', wishlist);
    }, [wishlist]);

    // Add item to cart
    const addToCart = (course) => {
        const existingItem = cartItems.find(item => item.id === course.id);

        if (existingItem) {
            // Item already in cart
            return { success: false, message: 'Course already in cart' };
        }

        const cartItem = {
            id: course.id,
            title: course.title,
            image: course.image,
            price: course.price,
            regularPrice: course.regularPrice,
            author: course.author,
            review: course.review,
            lesson: course.lesson,
            addedAt: new Date().toISOString()
        };

        setCartItems(prev => [...prev, cartItem]);
        return { success: true, message: 'Course added to cart' };
    };

    // Remove item from cart
    const removeFromCart = (courseId) => {
        setCartItems(prev => prev.filter(item => item.id !== courseId));
        return { success: true, message: 'Course removed from cart' };
    };

    // Clear entire cart
    const clearCart = () => {
        setCartItems([]);
        return { success: true, message: 'Cart cleared' };
    };

    // Check if item is in cart
    const isInCart = (courseId) => {
        return cartItems.some(item => item.id === courseId);
    };

    // Get cart total
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + price;
        }, 0);
    };

    // Get cart count
    const getCartCount = () => {
        return cartItems.length;
    };

    // Add to wishlist
    const addToWishlist = (course) => {
        const existingItem = wishlist.find(item => item.id === course.id);

        if (existingItem) {
            return { success: false, message: 'Course already in wishlist' };
        }

        const wishlistItem = {
            id: course.id,
            title: course.title,
            image: course.image,
            price: course.price,
            regularPrice: course.regularPrice,
            author: course.author,
            review: course.review,
            addedAt: new Date().toISOString()
        };

        setWishlist(prev => [...prev, wishlistItem]);
        return { success: true, message: 'Course added to wishlist' };
    };

    // Remove from wishlist
    const removeFromWishlist = (courseId) => {
        setWishlist(prev => prev.filter(item => item.id !== courseId));
        return { success: true, message: 'Course removed from wishlist' };
    };

    // Check if item is in wishlist
    const isInWishlist = (courseId) => {
        return wishlist.some(item => item.id === courseId);
    };

    // Move from wishlist to cart
    const moveToCart = (courseId) => {
        const course = wishlist.find(item => item.id === courseId);
        if (course) {
            addToCart(course);
            removeFromWishlist(courseId);
            return { success: true, message: 'Course moved to cart' };
        }
        return { success: false, message: 'Course not found in wishlist' };
    };

    const value = {
        cartItems,
        wishlist,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        getCartTotal,
        getCartCount,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        moveToCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
