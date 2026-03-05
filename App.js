import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [editId, setEditId] = useState(null);

  // 🔹 Fetch All Students
  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔹 Add or Update Student
  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = { name, department, year };

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, studentData);
        setEditId(null);
      } else {
        await axios.post(API_URL, studentData);
      }

      setName("");
      setDepartment("");
      setYear("");
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Delete Student
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchStudents();
  };

  // 🔹 Edit Student
  const handleEdit = (student) => {
    setName(student.name);
    setDepartment(student.department);
    setYear(student.year);
    setEditId(student._id);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Student CRUD Application</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          required
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          required
          onChange={(e) => setYear(e.target.value)}
        />
        <button type="submit">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      {/* Student List */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.department}</td>
              <td>{student.year}</td>
              <td>
                <button onClick={() => handleEdit(student)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student._id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;