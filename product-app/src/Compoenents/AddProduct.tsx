import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "./productSlice";
import { Product, Material } from "./type";
import { v4 as uuid } from "uuid";
import MaterialForm from "./MaterialForm";
import "./style.css";

export default function AddProduct() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Finished");
  const [expiry, setExpiry] = useState("");
  const [materials, setMaterials] = useState<Material[]>([]);

  const totalCost = materials.reduce((sum, m) => sum + m.totalAmount, 0);

  const addMaterial = (material: Material) => {
    setMaterials(prev => [...prev, material]);
  };

  const saveProduct = () => {
    const product: Product = {
      id: uuid(),
      name,
      unit: "units",
      category: category as any,
      expiry,
      materials,
      totalCost,
    };

    dispatch(addProduct(product));
    alert("Product Saved Successfully!");
  };

  return (
    <div>
      <h2>Add Product</h2>

      <input placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="Finished">Finished</option>
        <option value="Semi Finished">Semi Finished</option>
        <option value="Subsidiary">Subsidiary</option>
      </select>

      <input type="date"
        value={expiry}
        onChange={e => setExpiry(e.target.value)}
      />

      <MaterialForm onAdd={addMaterial} />

      <h3>Materials Added</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Tax</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {materials.map(m => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.quantity}</td>
              <td>{m.price}</td>
              <td>{m.totalPrice}</td>
              <td>{m.tax}</td>
              <td>{m.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Product Sub Total: ₹ {totalCost}</h3>

      <button onClick={saveProduct}>Save Product</button>
    </div>
  );
}