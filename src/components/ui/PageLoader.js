import React from "react";
import { Spinner } from "react-bootstrap";

export default function PageLoader() {
  return (
    <div className="page-loader">
      <div className="loader-content">
        <Spinner animation="border" size="lg" variant="primary" />
        <h4 className="mt-3">Loading ShopCart...</h4>
        <p className="text-muted">Please wait while we prepare your shopping experience</p>
      </div>
    </div>
  );
} 