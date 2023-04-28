import { useEffect, useReducer } from "react";
import { Product } from "./components/Product";
import { TableProducts } from "./components/TableProducts";
import { productData } from "./utils/constants";

const initialState = {
  product: JSON.parse(localStorage.getItem("product")) || productData,
};

const onlineReducer = (state, action) => {
  switch (action.type) {
    case "addProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + item.staticPrice,
            };
          }
          return item;
        }),
      };

    case "incrementProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + item.staticPrice,
            };
          }
          return item;
        }),
      };

    case "decrementProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload && item.quantity !== 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
              price: item.price - item.staticPrice,
            };
          }
          return item;
        }),
      };

    case "removeProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload && item.quantity !== 0) {
            return {
              ...item,
              quantity: (item.quantity = 0),
              price: item.staticPrice,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

function App() {
  const [store, dispatch] = useReducer(onlineReducer, initialState);

  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(store.product));
  }, [store.product]);

  const incrementProductHandler = (id) => {
    dispatch({ type: "incrementProduct", payload: id });
  };

  const decrementProductProductHandler = (id) => {
    dispatch({ type: "decrementProduct", payload: id });
  };

  const addProductHandler = (id) => {
    dispatch({ type: "addProduct", payload: id });
  };

  const removeProductHandler = (id) => {
    dispatch({ type: "removeProduct", payload: id });
  };

  return (
    <>
      <Product store={store.product} addProductHandler={addProductHandler} />
      <TableProducts
        incrementProductHandler={incrementProductHandler}
        decrementProductProductHandler={decrementProductProductHandler}
        store={store.product}
        removeProductHandler={removeProductHandler}
      />
    </>
  );
}

export default App;



