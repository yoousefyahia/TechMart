import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../rtk/slices/cartSlice";
import Notification from "./Notification";

export default function Wishlist() {
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
      setNotificationMessage(`${product.title} added to wishlist!`);
      setShowNotification(true);
    }
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    const product = wishlist.find(item => item.id === productId);
    setNotificationMessage(`${product.title} removed from wishlist!`);
    setShowNotification(true);
  };

  const moveToCart = (product) => {
    dispatch(addToCart(product));
    removeFromWishlist(product.id);
    setNotificationMessage(`${product.title} moved to cart!`);
    setShowNotification(true);
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <h2>💝 Your Wishlist is Empty</h2>
          <p className="text-muted">Start adding products to your wishlist to see them here!</p>
          <Button variant="primary" onClick={() => window.history.back()}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>💝 My Wishlist ({wishlist.length} items)</h2>
        <Button 
          variant="outline-danger" 
          onClick={() => {
            setWishlist([]);
            setNotificationMessage("Wishlist cleared!");
            setShowNotification(true);
          }}
        >
          Clear Wishlist
        </Button>
      </div>

      <Row>
        {wishlist.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="product-card fade-in">
              <div className="position-relative">
                <Card.Img 
                  variant="top" 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="card-img-top"
                />
                <Badge 
                  bg="success" 
                  className="position-absolute top-0 end-0 m-2"
                >
                  {product.category}
                </Badge>
                {product.discountPercentage > 0 && (
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 start-0 m-2"
                  >
                    -{Math.round(product.discountPercentage)}%
                  </Badge>
                )}
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute bottom-0 end-0 m-2"
                  onClick={() => removeFromWishlist(product.id)}
                  title="Remove from wishlist"
                >
                  ❤️
                </Button>
              </div>
              <Card.Body>
                <Card.Title className="text-truncate">{product.title}</Card.Title>
                <Card.Text className="text-muted small">
                  {product.description.length > 100 
                    ? `${product.description.substring(0, 100)}...` 
                    : product.description
                  }
                </Card.Text>
                
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <span className="product-price">${product.price}</span>
                    {product.discountPercentage > 0 && (
                      <small className="text-muted text-decoration-line-through ms-2">
                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                      </small>
                    )}
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="text-warning me-1">★</span>
                    <small className="text-muted">{product.rating}</small>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    Stock: {product.stock}
                  </small>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => moveToCart(product)}
                    disabled={product.stock === 0}
                    className="add-to-cart-btn"
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Move to Cart'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Notification
        show={showNotification}
        onClose={() => setShowNotification(false)}
        message={notificationMessage}
        type="success"
      />
    </div>
  );
} 