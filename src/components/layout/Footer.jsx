import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="footer mt-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2rem 0', marginTop: 'auto' }}>
      <Container>
        <Row className="py-4">
          <Col md={4}>
            <h5 className="text-white mb-3">ShopCart</h5>
            <p className="text-light">
              Your one-stop destination for quality products. 
              We provide the best shopping experience with a wide range of products.
            </p>
          </Col>
          <Col md={4}>
            <h6 className="text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/cart" className="text-light text-decoration-none">Cart</a></li>
              <li><a href="#" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className="text-white mb-3">Contact Info</h6>
            <p className="text-light mb-1">
              <i className="bi bi-envelope me-2"></i>
              info@shopcart.com
            </p>
            <p className="text-light mb-1">
              <i className="bi bi-telephone me-2"></i>
              +1 (555) 123-4567
            </p>
            <p className="text-light">
              <i className="bi bi-geo-alt me-2"></i>
              123 Shopping St, E-Commerce City
            </p>
          </Col>
        </Row>
        <hr className="text-light" />
        <Row>
          <Col className="text-center">
            <p className="text-light mb-0">
              © 2024 ShopCart. All rights reserved. | Built with React & Redux
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
} 