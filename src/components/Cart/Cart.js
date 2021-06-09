import React, { Fragment } from "react";
import { ProductConsumer } from "../../contexts/context";
import Title from "../Title";
import CartColumns from "./CartColumns.js";
import CartList from "./CartList";
import CartTotal from "./CartTotal";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  return (
    <div>
      <ProductConsumer>
        {(value) => {
          const { cart } = value;
          if (cart.length > 0) {
            return (
              <Fragment>
                <Title name="your" title="cart" />
                <CartColumns />
                <CartList value={value}/>
                <CartTotal value={value}/>
              </Fragment>
            )
          } else return <EmptyCart />
        }}
      </ProductConsumer>
    </div>
  );
};

export default Cart;
