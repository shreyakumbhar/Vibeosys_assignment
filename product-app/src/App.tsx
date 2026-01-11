


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Compoenents/store";

import ProductList from "./Compoenents/ProductList";
import AddProduct from "./Compoenents/AddProduct";
import EditProduct from "./Compoenents/EditProduct";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;