import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Badge, 
  Alert,
  Spinner,
  Modal,
  Form
} from "react-bootstrap";
import { addToCart } from "../../rtk/slices/cartSlice";
import Notification from "../ui/Notification";
import LazyImage from "../ui/LazyImage";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // جلب المنتجات من React Query
  const { data: products = [], isLoading: loading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get('https://dummyjson.com/products');
      return res.data.products;
    }
  });
  const cart = useSelector((state) => state.cart);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });

  const product = products.find(p => p.id === parseInt(id));
  const cartItem = cart.find(item => item.id === parseInt(id));
  const currentStock = product ? product.stock - (cartItem?.qyt || 0) : 0;

  const handleAddToCart = () => {
    if (product && quantity > 0 && quantity <= currentStock) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
      setShowNotification(true);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= currentStock) {
      setQuantity(newQuantity);
    }
  };

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setShowImageModal(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the review to your backend
    console.log('Review submitted:', reviewForm);
    setReviewForm({ rating: 5, comment: "" });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          <Alert.Heading>Product Not Found</Alert.Heading>
          <p>The product you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
        </Alert>
      </Container>
    );
  }

  // صور فريدة مع تجاهل الكيس والمسافات
  const normalize = url => url.trim().toLowerCase();
  const images = [product.thumbnail, ...product.images]
    .filter((img, idx, arr) =>
      arr.findIndex(x => normalize(x) === normalize(img)) === idx
    );
  const originalPrice = product.price / (1 - product.discountPercentage / 100);
  const savings = originalPrice - product.price;

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col lg={6}>
            <Card className="product-detail-card d-flex align-items-center justify-content-center" style={{ minHeight: 340, border: 'none', boxShadow: 'none', background: 'transparent' }}>
              <div
                style={{
                  width: 300,
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fafafa',
                  borderRadius: 16,
                  boxShadow: '0 2px 8px #eee',
                  margin: '0 auto 24px auto'
                }}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: 12
                  }}
                />
              </div>
              {product.discountPercentage > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-0 m-3"
                  style={{ fontSize: '1rem' }}
                >
                  -{Math.round(product.discountPercentage)}% OFF
                </Badge>
              )}
              <Badge 
                bg={product.stock > 10 ? "success" : product.stock > 0 ? "warning" : "danger"}
                className="position-absolute top-0 end-0 m-3"
              >
                {product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock"}
              </Badge>
            </Card>
          </Col>
          
          <Col lg={6}>
            <div className="product-details">
              <div className="mb-3">
                <Badge bg="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <Badge bg="info" className="ms-2 mb-2">
                  {product.brand}
                </Badge>
              </div>
              
              {/* العنوان الرئيسي */}
              <h3 className="product-title" style={{ fontSize: '1.5rem', fontWeight: 600 }}>{product.title}</h3>
              
              <div className="rating mb-3">
                <span className="text-warning">{"★".repeat(Math.floor(product.rating))}</span>
                <span className="text-muted">{"☆".repeat(5 - Math.floor(product.rating))}</span>
                <span className="ms-2 text-muted">({product.rating}/5)</span>
                <span className="ms-3 text-muted">• {product.stock} reviews</span>
              </div>
              
              <div className="pricing mb-4">
                <span className="current-price">${product.price.toFixed(2)}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="original-price ms-2">${originalPrice.toFixed(2)}</span>
                    <div className="text-success mt-1">
                      You save ${savings.toFixed(2)} ({Math.round(product.discountPercentage)}% off)
                    </div>
                  </>
                )}
              </div>
              
              <div className="product-description mb-4">
                <h6>Description</h6>
                <p>{product.description}</p>
              </div>
              
              <div className="product-info mb-4">
                <Row>
                  <Col md={6}>
                    <strong>Brand:</strong> {product.brand}
                  </Col>
                  <Col md={6}>
                    <strong>Category:</strong> {product.category}
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={6}>
                    <strong>Stock:</strong> {currentStock} available
                  </Col>
                  <Col md={6}>
                    <strong>Product ID:</strong> #{product.id}
                  </Col>
                </Row>
              </div>
              
              <div className="quantity-section mb-4">
                <h6>Quantity</h6>
                <div className="d-flex align-items-center">
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    max={currentStock}
                    className="mx-2"
                    style={{ width: '80px' }}
                  />
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= currentStock}
                  >
                    +
                  </Button>
                  <span className="ms-3 text-muted">
                    {currentStock} available
                  </span>
                </div>
              </div>
              
              <div className="action-buttons">
                <Button 
                  variant="primary" 
                  size="md"
                  onClick={handleAddToCart}
                  disabled={currentStock === 0}
                  className="me-2"
                  style={{ minWidth: 140, fontSize: '1rem', padding: '8px 18px' }}
                >
                  {currentStock === 0 ? 'Out of Stock' : `Add to Cart ($${(product.price * quantity).toFixed(2)})`}
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="md"
                  onClick={() => navigate('/cart')}
                  style={{ minWidth: 120, fontSize: '1rem', padding: '8px 16px' }}
                >
                  View Cart ({cart.reduce((acc, item) => acc + item.qyt, 0)})
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        
        {/* Reviews Section */}
        <Row className="mt-5">
          <Col>
            <Card className="product-detail-card">
              <Card.Header>
                <h4>Customer Reviews</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleReviewSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <div>
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          className="text-warning"
                          style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        >
                          {star <= reviewForm.rating ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      placeholder="Share your experience with this product..."
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    Submit Review
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Image Modal */}
      <Modal 
        show={showImageModal} 
        onHide={() => setShowImageModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{product.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={images[selectedImage]}
            alt={product.title}
            style={{ maxWidth: '100%', maxHeight: '70vh' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-center w-100">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
                style={{ cursor: 'pointer', margin: '0 5px' }}
              />
            ))}
          </div>
        </Modal.Footer>
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