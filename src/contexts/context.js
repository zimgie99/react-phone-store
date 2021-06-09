import React, { useState, createContext, useEffect } from "react";
import { storeProducts, DetailProduct } from "../data";
const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [detailProduct, setDetailProduct] = useState(DetailProduct);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(DetailProduct);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const SetProducts = () => {
    let products = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });
    console.log("in ", products);
    setProducts(products);
  };

  useEffect(() => {
    SetProducts();
    console.log("render");
  }, []);

  const getItem = (id) => {
    const product = products.find((item) => item.id === id);
    return product;
  };

  const handleDetail = (id) => {
    const product = getItem(id);
    setDetailProduct(product);
  };

  const getTotal = () => {
    let subTotal = 0;
    cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    return {
      subTotal,
      tax,
      total,
    };
  };

  const AddTotal = () => {
    const totals = getTotal();
    setCartSubTotal(totals.subTotal);
    setCartTax(totals.tax);
    setCartTotal(totals.total);
  };

  const AddToCart = (id) => {
    let tempProduct = [...products];
    // Xác định vị trí trong mảng
    const index = tempProduct.indexOf(getItem(id));
    const product = tempProduct[index];
    // Cập nhật thông tin sản phầm trong giỏ
    const price = product.price;
    product.inCart = true;
    product.count = product.count + 1;
    product.total = product.count * product.price;
    // Gán giá trị vào State giỏ hàng
    setCart([...cart, product]);
  };

  const openModal = (id) => {
    const product = getItem(id);
    setModalProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const increment = (id) => {
    let tempCart = [...cart];
    // Tìm id sản phẩm trong giỏ
    const selectedProduct = tempCart.find((item) => {
      return item.id === id;
    });
    // Xác định vị trí trong mảng
    const index = tempCart.indexOf(selectedProduct);
    const productInCart = tempCart[index];
    // Gán biến logic
    productInCart.count = productInCart.count + 1;
    productInCart.total = productInCart.count * productInCart.price;
    setCart(tempCart);
    AddTotal();
  };

  const decrement = (id) => {
    let tempCart = [...cart];
    // Tìm id sản phẩm trong giỏ
    const selectedProduct = tempCart.find((item) => {
      return item.id === id;
    });
    // Xác định vị trí trong mảng
    const index = tempCart.indexOf(selectedProduct);
    const productInCart = tempCart[index];
    // Gán logic
    productInCart.count = productInCart.count - 1;
    if (productInCart.count === 0) {
      removeItem(id);
    } else {
      productInCart.total = productInCart.count * productInCart.price;
      setCart(tempCart);
      AddTotal();
    }
  };

  const removeItem = (id) => {
    let tempProducts = [...products];
    let tempCart = [...cart];
    // Xóa phần tử có id tương ứng
    tempCart = tempCart.filter((item) => item.id !== id);
    // Xác định vị trí trong mảng
    const index = tempProducts.indexOf(getItem(id));
    // Thay đổi lại giá trị
    let removeProduct = tempProducts[index];
    removeProduct.inCart = false;
    removeProduct.count = 0;
    removeProduct.total = 0;
    // Gán giá trị
    setCart(tempCart);
    setProducts(tempProducts);
    AddTotal();
  };

  const clearCart = () => {
    SetProducts();
    setCart([]);
    setCartSubTotal(0);
    setCartTax(0);
    setCartTotal(0);
  };

  useEffect(() => {
    AddTotal();
  }, [cart]);

  return (
    <ProductContext.Provider
      value={{
        products,
        detailProduct,
        modalProduct,
        modalOpen,
        cart,
        cartSubTotal,
        cartTax,
        cartTotal,
        openModal,
        closeModal,
        handleDetail,
        AddToCart,
        increment,
        decrement,
        removeItem,
        clearCart,
        // AddTotal,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
