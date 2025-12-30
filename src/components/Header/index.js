import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import MenuItems from "./MenuItems";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import ShoppingCart from "../ShoppingCart";

import normalLogo from "../../assets/images/logos/logo.png";
import stickyLogo from "../../assets/images/logos/logo.png";

const Header = (props) => {
  const {
    topbarEnable,
    menuCategoryEnable,
    headerClass,
    parentMenu,
    headerNormalLogo,
    headerStickyLogo,
  } = props;

  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getCartCount, wishlist } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    // Sticky is displayed after scrolling for 100 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      <header
        id="react-header"
        className={
          headerClass ? headerClass : "react-header react-header-three"
        }
      >
        <div className={isVisible ? "header-area react-sticky" : "header-area"}>
          <div className="menu-part">
            <div className="container">
              <div className="react-main-menu">
                <nav>
                  <div className="menu-toggle">
                    <div className="logo">
                      {isVisible ? (
                        <Link to="/" className="logo-text">
                          <img
                            src={
                              headerStickyLogo ? headerStickyLogo : stickyLogo
                            }
                            alt=""
                            style={{ height: "80px", width: "auto" }}
                          />
                        </Link>
                      ) : (
                        <Link to="/" className="logo-text">
                          <img
                            src={
                              headerNormalLogo ? headerNormalLogo : normalLogo
                            }
                            alt=""
                            style={{ height: "80px", width: "auto" }}
                          />
                        </Link>
                      )}
                    </div>
                    <button
                      type="button"
                      id="menu-btn"
                      className={
                        menuOpen ? "mobile-menu-btn open" : "mobile-menu-btn"
                      }
                      onClick={() => {
                        setMenuOpen(!menuOpen);
                      }}
                    >
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                  </div>
                  <div
                    className={
                      menuOpen
                        ? "react-inner-menus menu-open"
                        : "react-inner-menus"
                    }
                  >
                    <ul id="backmenu" className="react-menus react-sub-shadow">
                      <MenuItems parentMenu={parentMenu} />
                    </ul>
                    <div className="searchbar-part">
                      <form className="search-form">
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Search Lessons"
                        />
                        <Link to="/course" className="form-button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-search"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </Link>
                      </form>
                    </div>
                    <div
                      className="header-actions"
                      style={{
                        marginLeft: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      {/* Wishlist Icon */}
                      <button
                        onClick={() => navigate('/wishlist')}
                        className="icon-button"
                        style={{
                          position: "relative",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "8px",
                          color: "#1a1a1a",
                        }}
                        title="Wishlist"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {wishlist.length > 0 && (
                          <span style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            background: "#dc3545",
                            color: "white",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            fontSize: "11px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "600",
                          }}>
                            {wishlist.length}
                          </span>
                        )}
                      </button>

                      {/* Shopping Cart Icon */}
                      <button
                        onClick={() => setCartOpen(true)}
                        className="icon-button"
                        style={{
                          position: "relative",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "8px",
                          color: "#1a1a1a",
                        }}
                        title="Shopping Cart"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        {getCartCount() > 0 && (
                          <span style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            background: "#0d6efd",
                            color: "white",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            fontSize: "11px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "600",
                          }}>
                            {getCartCount()}
                          </span>
                        )}
                      </button>

                      {/* Auth Buttons */}
                      <div className="auth-buttons" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {isAuthenticated ? (
                          <>
                            <span style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#333",
                              padding: "0 8px"
                            }}>
                              Welcome, {user?.username}
                            </span>
                            <button
                              onClick={handleLogout}
                              className="btn-logout"
                              style={{
                                padding: "10px 24px",
                                backgroundColor: "#ffffff",
                                color: "#dc3545",
                                border: "2px solid #dc3545",
                                borderRadius: "50px",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "600",
                                transition: "all 0.3s ease",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                letterSpacing: "0.3px"
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#dc3545";
                                e.currentTarget.style.color = "#ffffff";
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 4px 8px rgba(220,53,69,0.3)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#ffffff";
                                e.currentTarget.style.color = "#dc3545";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                              }}
                            >
                              Logout
                            </button>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/login"
                              className="btn-login"
                              style={{
                                padding: "10px 24px",
                                backgroundColor: "transparent",
                                color: "#1a73e8",
                                textDecoration: "none",
                                border: "2px solid #1a73e8",
                                borderRadius: "50px",
                                fontSize: "14px",
                                fontWeight: "600",
                                transition: "all 0.3s ease",
                                display: "inline-block",
                                letterSpacing: "0.3px"
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#1a73e8";
                                e.currentTarget.style.color = "#ffffff";
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 4px 8px rgba(26,115,232,0.3)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = "#1a73e8";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                              }}
                            >
                              Login
                            </Link>
                            <Link
                              to="/signup"
                              className="btn-signup"
                              style={{
                                padding: "10px 24px",
                                backgroundColor: "#1a73e8",
                                color: "#ffffff",
                                textDecoration: "none",
                                border: "2px solid #1a73e8",
                                borderRadius: "50px",
                                fontSize: "14px",
                                fontWeight: "600",
                                transition: "all 0.3s ease",
                                display: "inline-block",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                letterSpacing: "0.3px"
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#1557b0";
                                e.currentTarget.style.borderColor = "#1557b0";
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(26,115,232,0.4)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#1a73e8";
                                e.currentTarget.style.borderColor = "#1a73e8";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                              }}
                            >
                              Sign Up
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
