import React, { useState, memo } from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { addToCart } from "../../rtk/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import LazyImage from "./LazyImage";

const ProductCard = memo(({ product }) => {
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);
  
  console.log('ProductCard render, showNotification:', showNotification);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    setShowNotification(true);
    console.log('Product added to cart:', product.title);
  };
  
  return (
    <>
      <Card className="product-card">
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <div className="position-relative">
            <LazyImage 
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
              <div className="d-flex gap-1">
                <Button 
                  variant="primary" 
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add To Cart'}
                </Button>
              </div>
            </div>
          </Card.Body>
        </Link>
      </Card>
      
      <Notification
        show={showNotification}
        onClose={() => setShowNotification(false)}
        message={`${product.title} added to cart!`}
        type="success"
      />
    </>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
