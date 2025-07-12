import React from "react";
import { ListGroup } from "react-bootstrap";

export default function SearchSuggestions({ suggestions, onSelect, visible }) {
  if (!visible || suggestions.length === 0) {
    return null;
  }

  return (
    <ListGroup className="search-suggestions">
      {suggestions.map((suggestion, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => onSelect(suggestion)}
          className="suggestion-item"
        >
          <div className="d-flex align-items-center">
            <span className="me-2">🔍</span>
            <span>{suggestion}</span>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
} 