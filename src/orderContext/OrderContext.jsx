// OrdersContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context
const OrdersContext = createContext();

// Create a provider component
export const OrdersProvider = ({ children }) => {
  const [ordersArray, setOrdersArray] = useState([]);

  return (
    <OrdersContext.Provider value={{ ordersArray, setOrdersArray }}>
      {children}
    </OrdersContext.Provider>
  );
};

// Custom hook to use the OrdersContext
export const useOrders = () => useContext(OrdersContext);
