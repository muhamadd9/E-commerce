import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { TokenContext } from "../../Context/Token";
import logo from "../../../assets/ecocart-high-resolution-logo-transparent.png";
import styles from "./Navbar.module.css";
import { CartContext } from "../../Context/CartContext";

const Navbar = () => {
  let { token, setToken } = useContext(TokenContext);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [scroll, setScroll] = useState(false);
  const location = useLocation();
  let { numOfItems, getCart } = useContext(CartContext);
  let userName = localStorage.getItem("userName");
  function handleSignOut() {
    localStorage.removeItem("userToken");
    setToken(null);
  }
  async function getUserCart() {
    if (token) await getCart();
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolledDown(true);
      } else {
        setScrolledDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getUserCart();
  }, [token]);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-white fixed-top ${styles.nav} ${
          scrolledDown ? styles.scrolled : styles.notScrolled
        }`}
      >
        <div className="container px-2">
          <div className="logo me-3">
            <Link to={"/home"}>
              {" "}
              <img src={logo} style={{ width: "120px" }} alt="Logo" />
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse text-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `${
                      isActive || location.pathname === "/" ? "text-main" : ""
                    } nav-link`
                  }
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `${isActive ? "text-main" : ""} nav-link`
                  }
                  aria-current="page"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about-us"
                  className={({ isActive }) =>
                    `${isActive ? "text-main" : ""} nav-link`
                  }
                  aria-current="page"
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact-us"
                  className={({ isActive }) =>
                    `${isActive ? "text-main" : ""} nav-link`
                  }
                  aria-current="page"
                >
                  Contact 
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {token ? (
                <>
                 <div className=" d-flex me-0 me-lg-3 mt-2 mb-3 my-lg-0 justify-content-center align-items-center">
                   <Link to={'/cart'}>
                   <i className="fas fa-xl fa-cart-shopping text-sec position-relative">
                      <div className="bg-main position-absolute bottom-100 start-100 translate-middle text-white text-xsm d-flex justify-content-center align-items-center rounded-3 " style={{width:'18px',height:'18px'}}>{numOfItems}</div>
                    </i>
                   </Link>
                  </div>
                  <div className="user-info justify-content-center d-flex align-items-center">
                    <div
                      className="icon rounded-pill bg-main d-flex justify-content-center align-items-center"
                      style={{ width: "28px", height: "28px" }}
                    >
                      <i class="fa-solid fa-user text-white"></i>
                    </div>
                    <div className="con d-flex position-relative align-items-center ">
                      <p className="mb-0 px-2 text-sec">{userName}</p>
                      <div
                        className={`fas fa-arrow-turn-down  ${styles.scrolledDownIcon}`}
                        onClick={() => setScroll(!scroll)}
                      ></div>
                      <div
                        className={`${styles.conChild} position-absolute rounded-2 top-100 end-0 px-2 mt-2 py-2 ${
                          scroll ? "" : "d-none"
                        } `}
                        style={{ width: "180px" }}
                      >
                        <NavLink
                          to="/changePassword"
                          className={`text-main mb-1  ${styles.logoutIcon} text-decoration-none`}
                          aria-current="page"
                        >
                          <p className="my-0 ">Change Password</p>
                        </NavLink>
                        <hr className="my-1 text-main" />
                        <NavLink
                          to="/"
                          className={`text-main d-block mb-1 text-decoration-none ${styles.logoutIcon} `}
                          aria-current="page"
                          onClick={handleSignOut}
                        >
                          Log Out
                        </NavLink>
                      </div>
                    </div>
                  </div>
                 
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `${isActive ? "text-main" : ""} nav-link`
                      }
                      aria-current="page"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `${isActive ? "text-main" : ""} nav-link`
                      }
                      aria-current="page"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
