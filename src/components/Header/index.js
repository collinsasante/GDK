import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import MenuItems from "./MenuItems";
import { useAuth } from "../../context/AuthContext";

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

  const { user, logout, isAuthenticated, isAdmin } = useAuth();
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
                      className="auth-buttons"
                      style={{
                        marginLeft: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {isAuthenticated ? (
                        <>
                          <span style={{ fontSize: "14px" }}>
                            Welcome, {user?.username}
                          </span>
                          <button
                            onClick={handleLogout}
                            style={{
                              padding: "8px 20px",
                              backgroundColor: "#f44336",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            style={{
                              padding: "8px 20px",
                              backgroundColor: "#2196F3",
                              color: "white",
                              textDecoration: "none",
                              borderRadius: "4px",
                              fontSize: "14px",
                            }}
                          >
                            Login
                          </Link>
                          <Link
                            to="/signup"
                            style={{
                              padding: "8px 20px",
                              backgroundColor: "#4CAF50",
                              color: "white",
                              textDecoration: "none",
                              borderRadius: "4px",
                              fontSize: "14px",
                            }}
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
