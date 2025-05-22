import { useState, useEffect } from 'react';
import { Modal, Button, Spinner, Table, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_URL = import.meta.env.VITE_API_URL;

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingVendor, setEditingVendor] = useState(null);
  const [deletingVendor, setDeletingVendor] = useState(null);
const API_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/vendors`);
        if (!response.ok) throw new Error('Failed to fetch vendors');
        const data = await response.json();
        setVendors(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const handleEdit = async (updatedVendor) => {
    if (!updatedVendor.businessName || !updatedVendor.ownerName || !updatedVendor.email) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/vendors/${updatedVendor._id}/details`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVendor),
      });

      if (!response.ok) throw new Error("Update failed");

      const data = await response.json();
      setVendors(vendors.map(v => v._id === data._id ? data : v));
      toast.success("Vendor updated successfully!");
      setEditingVendor(null);
    } catch (err) {
      toast.error("Error updating vendor.");
      console.error('Error updating vendor:', err);
    }
  };

  const toggleApproval = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/vendors/${id}/approval`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: newStatus }),
      });

      if (!response.ok) throw new Error("Approval failed");

      const data = await response.json();
      setVendors(vendors.map(v => v._id === id ? data : v));
      toast.success(`Vendor ${newStatus ? "approved" : "revoked"} successfully!`);
    } catch (err) {
      toast.error("Error updating approval status.");
      console.error('Error updating approval:', err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/api/vendors/${deletingVendor._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("Delete failed");

      setVendors(vendors.filter(v => v._id !== deletingVendor._id));
      toast.success("Vendor deleted successfully!");
      setDeletingVendor(null);
    } catch (err) {
      toast.error("Error deleting vendor.");
      console.error('Error deleting vendor:', err);
    }
  };

  if (loading) return <div className="p-4"><Spinner animation="border" variant="primary" /> Loading...</div>;
  if (error) return <div className="p-4 text-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h1 className="mb-4">Vendors Management</h1>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-secondary">
            <tr>
              <th>Business Name</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Status</th>
              <th>Approved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map(vendor => (
              <tr key={vendor._id} className="text-center">
                <td>{vendor.businessName}</td>
                <td>{vendor.ownerName}</td>
                <td>{vendor.email}</td>
                <td>{vendor.status}</td>
                <td>
                  <span className={`badge ${vendor.isApproved ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {vendor.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => setEditingVendor(vendor)} className="me-2">
                    Edit
                  </Button>
                  <Button
                    variant={vendor.isApproved ? 'danger' : 'success'}
                    size="sm"
                    onClick={() => toggleApproval(vendor._id, !vendor.isApproved)}
                    className="me-2"
                  >
                    {vendor.isApproved ? 'Revoke' : 'Approve'}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setDeletingVendor(vendor)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Edit Modal */}
      <Modal show={!!editingVendor} onHide={() => setEditingVendor(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Business Name</Form.Label>
              <Form.Control
                type="text"
                value={editingVendor?.businessName || ''}
                onChange={(e) => setEditingVendor({ ...editingVendor, businessName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Owner Name</Form.Label>
              <Form.Control
                type="text"
                value={editingVendor?.ownerName || ''}
                onChange={(e) => setEditingVendor({ ...editingVendor, ownerName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editingVendor?.email || ''}
                onChange={(e) => setEditingVendor({ ...editingVendor, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={editingVendor?.status || ''}
                onChange={(e) => setEditingVendor({ ...editingVendor, status: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Approved"
                checked={editingVendor?.isApproved || false}
                onChange={(e) => setEditingVendor({ ...editingVendor, isApproved: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditingVendor(null)}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => handleEdit(editingVendor)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={!!deletingVendor} onHide={() => setDeletingVendor(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this vendor?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeletingVendor(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification Container */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Vendors;
