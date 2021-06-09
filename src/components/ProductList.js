import React, { Fragment } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../contexts/context";


const ProductList = () => {
  return (
    <Fragment>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />
          <div className="row">
            <ProductConsumer>
              {(value) => {
                return value.products.map((product) => {
                  return (
                    <Product
                      key={product.id}
                      product={product}
                      handleDetail={product.handleDetail}
                      AddToCart={product.AddToCart}
                    />
                  );
                });
              }}
            </ProductConsumer>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
