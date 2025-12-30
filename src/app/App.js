import React, { useState, useEffect, Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom';
import Preloader from "../components/Preloader";
import ErrorBoundary from "../components/ErrorBoundary";
import LoadTop from '../components/ScrollTop/LoadTop';

//Custom Components - Lazy Loaded
const HomeTwo = lazy(() => import('../pages/home'));
const About = lazy(() => import('../pages/about'));
const Course = lazy(() => import('../pages/course'));
const CourseDetails = lazy(() => import('../pages/course/course-details'));
const Login = lazy(() => import('../pages/authentication/login'));
const Signup = lazy(() => import('../pages/authentication/signup'));
const Contact = lazy(() => import('../pages/contact'));
const Admin = lazy(() => import('../pages/admin'));
const Checkout = lazy(() => import('../pages/checkout'));
const MyLessons = lazy(() => import('../pages/my-lessons'));
const Wishlist = lazy(() => import('../pages/wishlist'));
const Faq = lazy(() => import('../pages/faq'));
const Error = lazy(() => import('../pages/404'));


const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulate data loading delay
        setTimeout(() => {
        setIsLoading(false);
        }, 500);
    }, []);

    return (
        <ErrorBoundary>
            <div className='App'>
                {isLoading ?
                    <Preloader /> : ''
                }
                <>
                    <LoadTop />
                    <Suspense fallback={<Preloader />}>
                        <Routes>
                            <Route path="/" element={<HomeTwo />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/course" exact element={<Course />} />
                            <Route path="/course/:id" element={<CourseDetails />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/my-lessons" element={<MyLessons />} />
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/faq" element={<Faq />} />
                            <Route path='*' element={<Error />} />
                        </Routes>
                    </Suspense>
                </>
            </div>
        </ErrorBoundary>
    );
}

export default App;
