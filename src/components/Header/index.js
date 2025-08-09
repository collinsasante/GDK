import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MenuItems from './MenuItems';

import normalLogo from '../../assets/images/logos/logo.png';
import stickyLogo from '../../assets/images/logos/logo.png';

const Header = (props) => {
	const { topbarEnable, menuCategoryEnable, headerClass, parentMenu, headerNormalLogo, headerStickyLogo } = props;

	const [menuOpen, setMenuOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

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
			<header id="react-header" className={headerClass ? headerClass : 'react-header react-header-three'}>
				<div className={isVisible ? 'header-area react-sticky' : 'header-area'}>
					<div className="menu-part">
						<div className="container">
							<div className="react-main-menu">
								<nav>
									<div className="menu-toggle">
										<div className="logo">
											{
												isVisible ? 
												<Link to="/" className="logo-text">
													<img 
														src={headerStickyLogo ? headerStickyLogo : stickyLogo} 
														alt="" 
														style={{ height: '80px', width: 'auto' }} 
													/>
												</Link> :
												<Link to="/" className="logo-text">
													<img 
														src={headerNormalLogo ? headerNormalLogo : normalLogo} 
														alt="" 
														style={{ height: '80px', width: 'auto' }} 
													/>
												</Link>
											}
										</div>
										<button 
											type="button" 
											id="menu-btn" 
											className={menuOpen ? "mobile-menu-btn open" : "mobile-menu-btn"} 
											onClick={() => {setMenuOpen(!menuOpen)}}
										>
											<span className="icon-bar"></span>
											<span className="icon-bar"></span>
											<span className="icon-bar"></span>
										</button>
									</div>
									<div className={menuOpen ? "react-inner-menus menu-open" : "react-inner-menus"}>
										{
											menuCategoryEnable ?
											<div className="cate-part">
												<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
												<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
												<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
												<ul className="react-category-menu">
													<li><Link to="#">Categories <i className="arrow_carrot-down"></i></Link> 
														<ul>
															<li><Link to="/course">English Book</Link></li>
															<li><Link to="/course">Math Book</Link></li>
															<li><Link to="/course">Story Book</Link></li>
														</ul>
													</li>
												</ul>
											</div> : ''
										}
										<ul id="backmenu" className="react-menus react-sub-shadow">
											<MenuItems parentMenu={parentMenu} />
										</ul>                                
										<div className="searchbar-part"> 
											<form className="search-form">
												<input type="text" className="form-input" placeholder="Search Course" />
												<Link to="/course" className="form-button">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
												</Link>
											</form>
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
}

export default Header;
