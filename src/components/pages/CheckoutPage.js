import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  Alert,
  Badge,
  Image
} from "react-bootstrap";
import { clearCart } from "../../rtk/slices/cartSlice";
import Notification from "../ui/Notification";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  
  const [showNotification, setShowNotification] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    shippingMethod: "standard",
    paymentMethod: "credit"
  });

  const totalItems = cart.reduce((acc, item) => acc + item.qyt, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qyt), 0);
  const shippingCost = formData.shippingMethod === "express" ? 15 : 5;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    console.log('Order submitted:', { formData, cart, total });
    
    // Simulate order processing
    setTimeout(() => {
      dispatch(clearCart());
      setOrderComplete(true);
      setShowNotification(true);
    }, 2000);
  };

  const isFormValid = () => {
    return formData.firstName && formData.lastName && formData.email && 
           formData.address && formData.city && formData.state && formData.zipCode;
  };

  if (cart.length === 0) {
    return (
      <Container className="mt-4">
        <Alert variant="info">
          <Alert.Heading>Your cart is empty</Alert.Heading>
          <p>Please add some products to your cart before proceeding to checkout.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </Alert>
      </Container>
    );
  }

  if (orderComplete) {
    return (
      <Container className="mt-4">
        <Card className="text-center">
          <Card.Body>
            <div className="mb-4">
              <h1 className="text-success">🎉</h1>
              <h2>Order Placed Successfully!</h2>
              <p className="text-muted">Thank you for your purchase. You will receive an email confirmation shortly.</p>
            </div>
            <div className="mb-4">
              <h5>Order Summary</h5>
              <p>Order Total: <strong>${total.toFixed(2)}</strong></p>
              <p>Items: <strong>{totalItems}</strong></p>
            </div>
            <Button variant="primary" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <>
      <Container className="mt-4">
        <h2 className="mb-4">Checkout</h2>
        
        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header>
                <h5>Shipping Information</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Address *</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>City *</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>State *</Form.Label>
                        <Form.Control
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>ZIP Code *</Form.Label>
                        <Form.Control
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <hr />
                  
                  <h5>Shipping Method</h5>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === "standard"}
                      onChange={handleInputChange}
                      label={`Standard Shipping (5-7 business days) - $${shippingCost}`}
                    />
                    <Form.Check
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === "express"}
                      onChange={handleInputChange}
                      label={`Express Shipping (2-3 business days) - $${shippingCost}`}
                    />
                  </Form.Group>
                  
                  <hr />
                  
                  <h5>Payment Method</h5>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={formData.paymentMethod === "credit"}
                      onChange={handleInputChange}
                      label="Credit Card"
                    />
                    <Form.Check
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === "paypal"}
                      onChange={handleInputChange}
                      label="PayPal"
                    />
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    variant="success" 
                    size="lg"
                    disabled={!isFormValid()}
                    className="w-100"
                  >
                    Place Order - ${total.toFixed(2)}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4}>
            <Card>
              <Card.Header>
                <h5>Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  {cart.map((item, index) => (
                    <div key={item.id} className="d-flex align-items-center mb-2">
                      <Image 
                        src={item.thumbnail} 
                        alt={item.title}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <div className="fw-bold">{item.title}</div>
                        <small className="text-muted">
                          Qty: {item.qyt} × ${item.price}
                        </small>
                      </div>
                      <div className="fw-bold">
                        ${(item.price * item.qyt).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({totalItems} items):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="mt-3">
                  <Badge bg="info" className="mb-2">
                    Free returns within 30 days
                  </Badge>
                  <Badge bg="success" className="ms-2 mb-2">
                    Secure checkout
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Notification
        show={showNotification}
        onClose={() => setShowNotification(false)}
        message="Order placed successfully! Thank you for your purchase."
        type="success"
      />
    </>
  );
} 