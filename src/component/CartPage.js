import React from "react";
import { Button, Image, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {clearCart,decrease,increase,removeFromCart,} from "../rtk/slices/cartSlice";

export default function CartPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((acc, product) => {
    acc += product.price * product.qyt;
    return acc;
  }, 0);

  if (cart.length === 0) {
    return <h1 className="text-center"> You Don't Have Products </h1>;
  }

  return (
    <>
      <Button variant="primary" onClick={() => dispatch(clearCart())}>
        {" "}
        Clear Cart
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>price</th>
            <th>Qyt</th>
            <th>total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td width={"10%"}>
              <Image src={product.thumbnail} thumbnail style={{ width: "80px", height: "80px" }} />
              {" "}
              </td>
              <td> {product.title} </td>
              <td> {product.price} $ </td>
              <td>
                <div className="d-flex gap-3">
                  <Button onClick={() => dispatch(increase(product))}>+</Button>
                  <h3>{product.qyt}</h3>
                  <Button onClick={() => dispatch(decrease(product))}>-</Button>
                </div>
              </td>
              <td> {(product.price * product.qyt).toFixed(2)} $</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => dispatch(removeFromCart(product))}
                >
                  X
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2> Total Price: {total.toFixed(2)} $ </h2>   
       </>
  );
}
