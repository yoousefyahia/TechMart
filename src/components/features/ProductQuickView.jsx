import React from "react";
import { Modal, Button, Row, Col, Image, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../rtk/slices/cartSlice";
import Notification from "../ui/Notification";
import { useState } from "react";

export default function ProductQuickView({ product, show, onHide }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [showNotification, setShowNotification] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const cartItem = cart.find(item => item.id === product?.id);
  const isInCart = cartItem !== undefined;
  const canAddMore = !isInCart || cartItem?.qyt < product?.stock;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    setShowNotification(true);
    setQuantity(1);
  };

  if (!product) return null;

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Quick View - {product.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Image 
                src={product.thumbnail} 
                alt={product.title}
                fluid
                className="rounded"
              />
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Badge bg="success" className="me-2">{product.category}</Badge>
                {product.discountPercentage > 0 && (
                  <Badge bg="danger">-{Math.round(product.discountPercentage)}% OFF</Badge>
                )}
              </div>

              <h4>{product.title}</h4>
              
              <div className="mb-3">
                <span className="text-warning">★</span>
                <span className="ms-1">{product.rating}</span>
                <span className="text-muted ms-2">({product.stock} in stock)</span>
              </div>

              <div className="mb-3">
                <span className="h5 text-primary">${product.price}</span>
                {product.discountPercentage > 0 && (
                  <span className="text-muted text-decoration-line-through ms-2">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-muted">{product.description}</p>

              <div className="mb-3">
                <strong>Brand:</strong> {product.brand}
              </div>

              {isInCart && (
                <div className="alert alert-info">
                  <strong>{cartItem.qyt}</strong> {cartItem.qyt === 1 ? 'item' : 'items'} in cart
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Quantity:</label>
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="mx-3 fw-bold">{quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                  disabled={!canAddMore}
                  className="add-to-cart-btn"
                >
                  {isInCart ? 'Add More to Cart' : 'Add to Cart'}
                </Button>
                <Button variant="outline-primary" onClick={onHide}>
                  View Full Details
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <Notification
        show={showNotification}
        onClose={() => setShowNotification(false)}
        message={`${quantity} ${quantity === 1 ? 'item' : 'items'} of ${product.title} added to cart!`}
        type="success"
      />
    </>
  );
} 