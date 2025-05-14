import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/userslist");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) return;

    const newUserObj = {
      id: Date.now(),
      ...newUser,
    };

    setUsers([...users, newUserObj]);
    setNewUser({ name: "", email: "", role: "" });
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setNewUser({ ...newUser, [field]: value });
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /> Loading users...</div>;
  if (error) return <Alert variant="danger" className="mt-4 text-center">{error}</Alert>;

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">User Management</h1>

      {/* Add User */}
      <Row className="mb-4 g-2">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => handleInputChange(e, "name")}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => handleInputChange(e, "email")}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Role"
            value={newUser.role}
            onChange={(e) => handleInputChange(e, "role")}
          />
        </Col>
        <Col md={3}>
          <Button variant="primary" onClick={handleAddUser} className="w-100">
            Add User
          </Button>
        </Col>
      </Row>

      {/* User Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;