import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    region: "",
    item: "",
    units: "",
    subscribers: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000", formData);
      fetchData();
      setFormData({
        region: "",
        item: "",
        units: "",
        subscribers: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Data Table</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
        <label>
          Region:
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
          />
        </label>
        <label>
          Item:
          <input
            type="number"
            name="item"
            value={formData.item}
            onChange={handleChange}
          />
        </label>
        <label>
          Units:
          <input
            type="number"
            name="units"
            value={formData.units}
            onChange={handleChange}
          />
        </label>
        <label>
          Subscribers:
          <input
            className="lastInput"
            type="number"
            name="subscribers"
            value={formData.subscribers}
            onChange={handleChange}
          />
        </label>
        <button className="submit-btn" type="submit">
          Add Data
        </button>
      </form>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Region</th>
            <th style={tableHeaderStyle}>Item</th>
            <th style={tableHeaderStyle}>Units</th>
            <th style={tableHeaderStyle}>Subscribers</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td style={tableCellStyle}>{item.region}</td>
              <td style={tableCellStyle}>{item.units}</td>
              <td style={tableCellStyle}>{item.item}</td>
              <td style={tableCellStyle}>{item.subscribers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableHeaderStyle = {
  backgroundColor: "rgb(163 83 83)",
  fontWeight: "bold",
  textAlign: "left",
  padding: "10px",
  border: "1px solid #ddd",
};

const tableCellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
};

export default App;
