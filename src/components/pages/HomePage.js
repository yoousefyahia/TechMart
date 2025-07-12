import React, { useEffect, useState, useCallback } from "react";
import { Col, Row, Form, Button, Alert } from "react-bootstrap";
import ProductCard from "../ui/ProductCard";
import PageLoader from "../ui/PageLoader";
import SearchSuggestions from "../ui/SearchSuggestions";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function HomePage() {
  // Remove Redux products state
  // const dispatch = useDispatch();
  // const { products, loading, error } = useSelector((state) => state.products);

  // Fetch products using React Query
  const { data: products = [], isLoading: loading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get('https://dummyjson.com/products');
      return res.data.products;
    }
  });
  
  // Load user preferences from localStorage
  const loadPreferences = () => {
    try {
      const saved = localStorage.getItem('userPreferences');
      return saved ? JSON.parse(saved) : {
        searchTerm: "",
        selectedCategory: "all",
        sortBy: "name",
        priceRange: { min: "", max: "" }
      };
    } catch (error) {
      console.error('Error loading preferences:', error);
      return {
        searchTerm: "",
        selectedCategory: "all",
        sortBy: "name",
        priceRange: { min: "", max: "" }
      };
    }
  };

  const [searchTerm, setSearchTerm] = useState(loadPreferences().searchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(loadPreferences().searchTerm);
  const [selectedCategory, setSelectedCategory] = useState(loadPreferences().selectedCategory);
  const [sortBy, setSortBy] = useState(loadPreferences().sortBy);
  const [priceRange, setPriceRange] = useState(loadPreferences().priceRange);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Save preferences to localStorage
  const savePreferences = (newPreferences) => {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  // Update preferences when filters change
  useEffect(() => {
    const preferences = { searchTerm, selectedCategory, sortBy, priceRange };
    savePreferences(preferences);
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  // Get unique categories
  const categories = ["all", ...new Set(products.map(product => product.category))];

  // Get price range
  const prices = products.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Generate search suggestions
  const generateSuggestions = () => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    const suggestions = [];
    const searchLower = searchTerm.toLowerCase();
    
    // Add category suggestions
    categories.forEach(category => {
      if (category !== "all" && category.toLowerCase().includes(searchLower)) {
        suggestions.push(`Category: ${category}`);
      }
    });
    
    // Add brand suggestions
    const brands = [...new Set(products.map(p => p.brand))];
    brands.forEach(brand => {
      if (brand && brand.toLowerCase().includes(searchLower)) {
        suggestions.push(`Brand: ${brand}`);
      }
    });
    
    // Add price range suggestions
    if (searchLower.includes('cheap') || searchLower.includes('low')) {
      suggestions.push('Price: Under $50');
    }
    if (searchLower.includes('expensive') || searchLower.includes('high')) {
      suggestions.push('Price: Over $100');
    }
    
    return suggestions.slice(0, 5);
  };

  const suggestions = generateSuggestions();

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = (product.title && product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
                          (product.description && product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
                          (product.brand && product.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      
      // Price range filter
      const matchesPrice = (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                          (!priceRange.max || product.price <= parseFloat(priceRange.max));
      
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("name");
    setPriceRange({ min: "", max: "" });
  }, []);

  const handleSearchSelect = (suggestion) => {
    if (suggestion.startsWith('Category: ')) {
      const category = suggestion.replace('Category: ', '');
      setSelectedCategory(category);
      setSearchTerm("");
    } else if (suggestion.startsWith('Brand: ')) {
      const brand = suggestion.replace('Brand: ', '');
      setSearchTerm(brand);
    } else if (suggestion.startsWith('Price: ')) {
      const priceText = suggestion.replace('Price: ', '');
      if (priceText.includes('Under $50')) {
        setPriceRange({ min: "", max: "50" });
      } else if (priceText.includes('Over $100')) {
        setPriceRange({ min: "100", max: "" });
      }
      setSearchTerm("");
    }
    setShowSuggestions(false);
  };

  if (loading && products.length === 0) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <Alert variant="danger" className="error-message">
        <Alert.Heading>Error!</Alert.Heading>
        <p>Failed to load products. Please try again later.</p>
      </Alert>
    );
  }

  return (
    <div className="container mt-4">
      {/* Search and Filter Section */}
      <Row>
        <Col md={4}>
          <Form.Group className="position-relative">
            <Form.Control
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="search-input"
            />
            <SearchSuggestions
              suggestions={suggestions}
              onSelect={handleSearchSelect}
              visible={showSuggestions}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="search-input"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Control
            type="number"
            placeholder="Min Price"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="search-input"
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="number"
            placeholder="Max Price"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="search-input"
          />
        </Col>
        <Col md={2}>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="search-input"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Sort by Rating</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">
              {`Showing ${filteredProducts.length} of ${products.length} products`}
              {priceRange.min || priceRange.max ? (
                <span className="ms-2">
                  (Price range: ${priceRange.min || minPrice} - ${priceRange.max || maxPrice})
                </span>
              ) : null}
            </div>
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </Col>
      </Row>
      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <h3>No products found</h3>
          <p className="text-muted">Try adjusting your search or filters</p>
          <Button variant="primary" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="products-section">
          <div className="section-header">
            <h2 className="section-title">🛍️ All Products</h2>
            <p className="section-subtitle">Browse our full collection</p>
          </div>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}
