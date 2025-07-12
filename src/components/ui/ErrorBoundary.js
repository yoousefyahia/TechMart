import React from "react";
import { Alert, Button } from "react-bootstrap";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <Alert variant="danger" className="text-center">
            <Alert.Heading>Something went wrong!</Alert.Heading>
            <p>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <hr />
            <div className="d-flex justify-content-center">
              <Button 
                variant="outline-danger" 
                onClick={() => window.location.reload()}
                className="me-2"
              >
                Refresh Page
              </Button>
              <Button 
                variant="outline-primary" 
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
              >
                Try Again
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-3">
                <summary>Error Details (Development)</summary>
                <pre className="mt-2 text-start">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 