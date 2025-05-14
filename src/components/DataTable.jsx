import { useState } from 'react';

export default function DataTable({ data, columns, onEdit, onDelete, onAdd }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="table-container">
      <div className="p-4 flex justify-end">
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          Add New
        </button>
      </div>

      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={column.key}>{item[column.key]}</td>
              ))}
              <td>
                <div className="action-buttons">
                  <button 
                    onClick={() => onEdit(item)} 
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)} 
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="text-lg font-bold mb-4">Add New</h3>
            <form onSubmit={handleSubmit}>
              {columns.map((column) => (
                column.key !== 'id' && (
                  <div key={column.key} className="input-group">
                    <label>{column.header}</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => setFormData({
                        ...formData,
                        [column.key]: e.target.value
                      })}
                    />
                  </div>
                )
              ))}
              <div className="flex gap-2 mt-4">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button 
                  type="button" 
                  className="btn" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}