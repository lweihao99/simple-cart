import React from "react";
import { useGlobalContext } from "./context";

// components
import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
// items

function App() {
  const { loading } = useGlobalContext();

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  // todo add shop page with product and bag button to return to bag page
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
