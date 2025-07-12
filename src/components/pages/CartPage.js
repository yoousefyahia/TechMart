import React from "react";
import { Button, Image, Table, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decrease, increase, removeFromCart } from "../../rtk/slices/cartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showClearModal, setShowClearModal] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((acc, product) => acc + product.price * product.qyt, 0);
  const totalItems = cart.reduce((acc, product) => acc + product.qyt, 0);

  if (cart.length === 0) {
    return (
      <div className="empty-cart d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <h1>🛒</h1>
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Button 
          variant="primary" 
          size="lg"
          onClick={() => window.history.back()}
          className="add-to-cart-btn mt-3"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Shopping Cart</h2>
          <p className="text-muted mb-0">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <Button 
          variant="danger" 
          onClick={() => setShowClearModal(true)}
          className="clear-cart-btn"
        >
          Clear Cart
        </Button>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover className="text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product, index) => (
              <tr key={product.id} className="align-middle">
                <td>{index + 1}</td>
                <td width="10%">
                  <Image 
                    src={product.thumbnail} 
                    thumbnail 
                    className="cart-img"
                    alt={product.title}
                  />
                </td>
                <td>
                  <div className="text-start">
                    <strong>{product.title}</strong>
                    <br />
                    <small className="text-muted">{product.category}</small>
                  </div>
                </td>
                <td>
                  <span className="product-price">${product.price}</span>
                </td>
                <td>
                  <div className="quantity-controls">
                    <Button 
                      size="sm" 
                      onClick={() => dispatch(decrease(product))}
                      className="quantity-btn"
                      disabled={product.qyt <= 1}
                    >
                      -
                    </Button>
                    <span className="fw-bold">{product.qyt}</span>
                    <Button 
                      size="sm" 
                      onClick={() => dispatch(increase(product))}
                      className="quantity-btn"
                      disabled={product.qyt >= product.stock}
                    >
                      +
                    </Button>
                  </div>
                  {product.qyt >= product.stock && (
                    <small className="text-danger d-block mt-1">
                      Max stock reached
                    </small>
                  )}
                </td>
                <td>
                  <span className="fw-bold text-success">
                    ${(product.price * product.qyt).toFixed(2)}
                  </span>
                </td>
                <td>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => dispatch(removeFromCart(product))}
                    className="remove-btn"
                  >
                    ✕
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="total-price">
        <div className="row">
          <div className="col-md-6">
            <h4>Order Summary</h4>
            <p className="mb-1">Total Items: {totalItems}</p>
            <p className="mb-0">Total Price: <strong>${total.toFixed(2)}</strong></p>
          </div>
          <div className="col-md-6 text-end">
            <Button 
              variant="success" 
              size="lg"
              className="add-to-cart-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>

      {/* Clear Cart Modal */}
      <Modal show={showClearModal} onHide={() => setShowClearModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Clear Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove all items from your cart?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowClearModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => {
              dispatch(clearCart());
              setShowClearModal(false);
            }}
          >
            Clear Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
