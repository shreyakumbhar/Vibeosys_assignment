import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Link } from "react-router-dom";
import "./style.css";

export default function ProductList() {
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <div>
      <h2 style={{color:"Blue"}}>Product Inventory</h2>
      <Link to="/add" style={{textDecoration:"none",color:"green"}}>Add New Product</Link>

      <table border={1} >
        <thead>
          <tr >
            <th >Name</th>
            <th>Category</th>
            <th>Total Cost</th>
            <th>No. of Materials</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td><Link to={`/edit/${p.id}`}>{p.name}</Link></td>
              <td>{p.category}</td>
              <td>₹ {p.totalCost}</td>
              <td>{p.materials.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}