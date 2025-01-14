import { createContext, useState, useEffect } from "react";
import useUser from "../hooks/useUser";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Store all products
  const isLoggedIn = useUser();
  // Initialize cartItems from server or local storage
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart && storedCart !== undefined ? JSON.parse(storedCart) : [];
  });

  console.log("All products", products);
  console.log("My cart items", cartItems);

  const login = () => {
    setIsLoggedIn(true);
  };

  // Fetch products from server
  useEffect(() => {
    fetch("http://localhost:3000/api/products/getproduct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("userToken"),
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products); // Assume the API returns { products: [...] }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Fetch cart items from server on load
  useEffect(() => {
    if (isLoggedIn) {
      fetch("http://localhost:3000/api/products/getcartitems", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("userToken"),
          accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCartItems(data.cartItems); // Assume API returns { cartItems: [...] }
        })
        .catch((err) => console.error("Error fetching cart items:", err));
    }
  }, [isLoggedIn]);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  //add to cart fecthing from the server
  const addToCart = (productId, quantity, price, imageUrl, name) => {
    console.log({ productId, quantity, price, imageUrl, name });
    // Optimistic local update
    setCartItems((prevCartItems) => {
      // If cart is empty, initialize it with the first item
      //cart item must be an array otherwise prevCartItems will be an obje
      if (!Array.isArray(prevCartItems)) {
        return [{ productId, quantity, price, imageUrl, name }];
      }
      const productIndex = prevCartItems.findIndex(
        (item) => item.productId === productId
      );
      if (productIndex > -1) {
        // Update quantity if product exists in the cart
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[productIndex] = {
          ...updatedCartItems[productIndex],
          quantity: updatedCartItems[productIndex].quantity + quantity,
        };
        return updatedCartItems;
      } else {
        // Add new product to the cart
        return [
          ...prevCartItems,
          { productId, quantity, price, imageUrl, name },
        ];
      }
    });

    // Server update
    fetch(`http://localhost:3000/api/products/addtocart/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("userToken"),
      },
      body: JSON.stringify({ productId, quantity }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to add to cart: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.cartItems) {
          // Sync cart with server response
          setCartItems(data.cartItems);
        } else {
          console.error("Invalid server response: Missing cart items data");
        }
      })
      .catch((err) => {
        console.error("Error adding to cart:", err.message);
      });
  };

  const removeFromCart = async (productId) => {
    console.log("Removing from cart:", productId);
    // Optimistic local update
    const previousCartItems = [...cartItems];
    setCartItems((prevCartItems) => {
      const productIndex = prevCartItems.findIndex(
        (item) => item.productId === productId
      );
      if (productIndex > -1) {
        const updatedCartItems = [...prevCartItems];
        if (updatedCartItems[productIndex].quantity > 1) {
          updatedCartItems[productIndex] = {
            ...updatedCartItems[productIndex],
            quantity: updatedCartItems[productIndex].quantity - 1,
          };
        } else {
          updatedCartItems.splice(productIndex, 1);
        }
        return updatedCartItems;
      }
      return prevCartItems;
    });

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/removefromcart/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("userToken"),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to remove from cart: ${response.statusText}`);
      }

      const data = await response.json();
      if (data && data.cartItems) {
        // Sync cart with server response
        setCartItems(data.cartItems);
      } else {
        console.error("Invalid server response: Missing cart items data");
      }
    } catch (err) {
      console.error("Error removing from cart:", err.message);
      // Revert optimistic update
      setCartItems(previousCartItems);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const logout = () => {
    localStorage.removeItem("userToken"); // Clear token on logout
    setCartItems([]); // Clear cart on logout
    window.location.reload(); // Reload the page to update the UI
  };

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        cartItems,
        addToCart,
        removeFromCart,
        calculateTotal,
        products, // Provide products to context
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
