import React from "react";
import { Button, Card } from "react-bootstrap";
import { addToCart } from "../rtk/slices/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={product.thumbnail} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>

        <Card.Text>{product.price} $</Card.Text>
        <Button variant="primary" onClick={() => dispatch(addToCart(product))}>
          Add To Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
