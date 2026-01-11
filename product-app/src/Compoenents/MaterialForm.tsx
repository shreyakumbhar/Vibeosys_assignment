import { useState } from "react";
import { Material } from "./type";
import { v4 as uuid } from "uuid";
import "./style.css";

interface Props {
  onAdd: (material: Material) => void;
}

export default function MaterialForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("kg");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const totalPrice = quantity * price;
  const tax = totalPrice * 0.1;
  const totalAmount = totalPrice + tax;

  const handleAdd = () => {
    if (!name || quantity <= 0 || price <= 0) return;

    onAdd({
      id: uuid(),
      name,
      unit: unit as any,
      quantity,
      price,
      totalPrice,
      tax,
      totalAmount,
    });

    // Reset fields
    setName("");
    setQuantity(0);
    setPrice(0);
  };

  return (
    <div style={{ border: "1px solid gray", padding: 10, marginTop: 10 }}>
      <h4>Add Raw Material</h4>

      <input placeholder="Material Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <select value={unit} onChange={e => setUnit(e.target.value)}>
        <option value="ml">ml</option>
        <option value="ltr">ltr</option>
        <option value="gm">gm</option>
        <option value="kg">kg</option>
        <option value="box">box</option>
        <option value="units">units</option>
      </select>

      <input type="number" placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      />

      <input type="number" placeholder="Price"
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
      />

      <div>
        <p>Total Price: ₹ {totalPrice}</p>
        <p>Tax (10%): ₹ {tax}</p>
        <p><b>Total Amount: ₹ {totalAmount}</b></p>
      </div>

      <button onClick={handleAdd}>Add Material</button>
    </div>
  );
}