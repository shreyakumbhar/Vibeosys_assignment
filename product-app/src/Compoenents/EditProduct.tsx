import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "./store";
import { updateProduct } from "./productSlice";
import { Product, Material } from "./type";
import MaterialForm from "./MaterialForm";
import "./style.css";

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state: RootState) =>
    state.products.products.find(p => p.id === id)
  );

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Finished");
  const [expiry, setExpiry] = useState("");
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setExpiry(product.expiry);
      setMaterials(product.materials);
    }
  }, [product]);

  const totalCost = materials.reduce((sum, m) => sum + m.totalAmount, 0);

  const addMaterial = (material: Material) => setMaterials(prev => [...prev, material]);
  const removeMaterial = (id: string) => setMaterials(prev => prev.filter(m => m.id !== id));

  const saveProduct = () => {
    if (!product) return;

    const updatedProduct: Product = {
      ...product,
      name,
      category: category as any,
      expiry,
      materials,
      totalCost,
    };

    dispatch(updateProduct(updatedProduct));
    alert("Product Updated Successfully!");
    navigate("/");
  };

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h2>Update Product</h2>

      <input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="Finished">Finished</option>
        <option value="Semi Finished">Semi Finished</option>
        <option value="Subsidiary">Subsidiary</option>
      </select>
      <input type="date" value={expiry} onChange={e => setExpiry(e.target.value)} />

      <MaterialForm onAdd={addMaterial} />

      <h3>Materials</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Tax</th>
            <th>Total Amount</th>
            <th>Action</th>
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
              <td><button onClick={() => removeMaterial(m.id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Product Sub Total: ₹ {totalCost}</h3>
      <button onClick={saveProduct}>Update Product</button>
    </div>
  );
}