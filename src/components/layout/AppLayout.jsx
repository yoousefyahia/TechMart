import { Link, Outlet } from "react-router-dom";
import { Container, Nav, Navbar, Badge, Dropdown, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import Footer from "./Footer";
import ScrollToTop from "../ui/ScrollToTop";

export default function AppLayout() {
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((acc, product) => acc + product.qyt, 0);
  const totalPrice = cart.reduce((acc, product) => acc + product.price * product.qyt, 0);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <ScrollToTop />
      {/* Animated Background Bubbles */}
      <div className="animated-bg">
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>
        <div className="bubble bubble4"></div>
        <div className="bubble bubble5"></div>
      </div>
      <Navbar bg="light" expand="lg" className="sticky-top modern-navbar shadow-sm" style={{ backdropFilter: 'blur(12px)', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center brand-logo gap-2">
            <div className="logo-container d-flex align-items-center gap-2">
              <span className="logo-icon" style={{ fontSize: '2rem', filter: 'drop-shadow(0 2px 8px #8ec5fc88)' }}>🛍️</span>
              <span className="logo-text fw-bold fs-4" style={{ letterSpacing: '1px', color: '#ffffff' }}>TechMart</span>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto main-nav gap-3 align-items-center">
              <Nav.Link as={Link} to="/" className="nav-item px-3">
                <span className="nav-text ms-1">Home</span>
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto user-nav align-items-center">
              <Nav.Link as={Link} to="/cart" className="nav-item cart-item position-relative ms-2 d-flex align-items-center">
                <div className="cart-icon-container d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #8ec5fc 0%, #667eea 100%)', boxShadow: '0 2px 8px #8ec5fc44' }}>
                  <span className="nav-icon fs-5 text-white">🛒</span>
                </div>
                {totalItems > 0 && (
                  <Badge
                    bg="danger"
                    className="cart-badge ms-1 align-self-start"
                    style={{
                      fontSize: '0.95rem',
                      minWidth: 22,
                      minHeight: 22,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      marginLeft: '6px',
                      marginTop: '2px'
                    }}
                  >
                    {totalItems}
                  </Badge>
                )}
                <span className="nav-text ms-2">Cart</span>
                {totalItems > 0 && (
                  <span className="cart-total ms-2 fw-bold text-primary">
                    ${totalPrice.toFixed(2)}
                  </span>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container fluid className="px-0">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
