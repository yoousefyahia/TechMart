import React from "react";
import { Button, Image, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decrease, increase, removeFromCart } from "../rtk/slices/cartSlice";

export default function CartPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((acc, product) => acc + product.price * product.qyt, 0);

  if (cart.length === 0) {
    return <h1 className="text-center"> You Don't Have Products </h1>;
  }

  return (
    <div className="container mt-4">
      <Button variant="primary" className="mb-3" onClick={() => dispatch(clearCart())}>
        Clear Cart
      </Button>

      <div className="table-responsive">
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Qyt</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td width="10%">
                  <Image src={product.thumbnail} thumbnail className="cart-img" />
                </td>
                <td>{product.title}</td>
                <td>{product.price} $</td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <Button size="sm" onClick={() => dispatch(increase(product))}>
                      +
                    </Button>
                    <h5 className="m-0">{product.qyt}</h5>
                    <Button size="sm" onClick={() => dispatch(decrease(product))}>
                      -
                    </Button>
                  </div>
                </td>
                <td>{(product.price * product.qyt).toFixed(2)} $</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => dispatch(removeFromCart(product))}>
                    X
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <h2 className="text-end mt-3">Total Price: {total.toFixed(2)} $</h2>
    </div>
  );
}
