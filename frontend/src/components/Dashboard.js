import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [medicines, setMedicines] = useState([]);
  const [formData, setFormData] = useState({ name: "", stock: "", expiry: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const res = await axios.get("/api/inventory");
    setMedicines(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`/api/inventory/${editingId}`, formData);
    } else {
      await axios.post("/api/inventory", formData);
    }
    setFormData({ name: "", stock: "", expiry: "" });
    setEditingId(null);
    fetchMedicines();
  };

  const handleEdit = (med) => {
    setFormData({ name: med.name, stock: med.stock, expiry: med.expiry.split("T")[0] });
    setEditingId(med._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/inventory/${id}`);
    fetchMedicines();
  };

  const isExpired = (expiry) => new Date(expiry) < new Date();

  return (
    <div className="dashboard">
      <header className="header">
        <img src="/logo.png" alt="NKD Enterprises" style={{ height: '100px' }} />

        <h1>Smart Pharmacy</h1>
        <p className="sub-logo">NKD Enterprises</p>
      </header>

      <form className="medicine-form" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Medicine Name" required />
        <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
        <input name="expiry" type="date" value={formData.expiry} onChange={handleChange} required />
        <button type="submit">{editingId ? "Update" : "Add"} Medicine</button>
      </form>

      <div className="medicine-list">
        <h2>Inventory Dashboard</h2>
        {medicines.length === 0 ? <p>No medicines found.</p> : (
          medicines.map((med) => (
            <div key={med._id} className={`medicine-card ${isExpired(med.expiry) ? "expired" : ""}`}>
              <p><strong>{med.name}</strong> – {med.stock} units (Expires: {new Date(med.expiry).toLocaleDateString()})</p>
              {med.stock < 10 && <p className="low-stock">⚠️ Low stock</p>}
              {isExpired(med.expiry) && <p className="expired-text">❌ Expired</p>}
              <div className="btn-group">
                <button onClick={() => handleEdit(med)}>Edit</button>
                <button onClick={() => handleDelete(med._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
