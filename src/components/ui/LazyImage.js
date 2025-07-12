import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

export default function LazyImage({ src, alt, className, ...props }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className="lazy-image-container">
      {loading && (
        <div className="image-loading">
          <Spinner animation="border" size="sm" variant="primary" />
        </div>
      )}
      {error ? (
        <div className="image-error">
          <span>⚠️</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} ${loading ? 'hidden' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  );
} 