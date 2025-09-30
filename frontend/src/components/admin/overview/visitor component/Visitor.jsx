import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, InputGroup } from "react-bootstrap";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "../visitor component/visitor.css";

const Visitor = () => {
  const [visitors, setVisitors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentVisitor, setCurrentVisitor] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    image: null,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch visitor data from API
    // For now, we'll use mock data
    const mockVisitors = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: `Visitor ${index + 1}`,
      gender: "male",
      purpose: `Purpose ${(index % 5) + 1}`,
      dateOfBirth: "january 1 2025",
      province: "Nueva Ecija",
      city: "Quezon",
      brgy: "San Miguel",
      contactNumber: `+639948${index.toString().padStart(7, "0")}`,
      visitDate: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toLocaleDateString(),
    }));
    setVisitors(mockVisitors);
  }, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentVisitor({
        ...currentVisitor,
        image: file,
      });
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleClose = () => {
    setShowModal(false);
    setImagePreview(null);
  };
  const handleShow = () => setShowModal(true);

  const handleAddEdit = (visitor = {}) => {
    setCurrentVisitor(visitor);
    setImagePreview(visitor.image || null);
    handleShow();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this visitor?")) {
      setVisitors(visitors.filter((visitor) => visitor.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentVisitor.id) {
      // Update existing visitor
      setVisitors(
        visitors.map((visitor) =>
          visitor.id === currentVisitor.id ? currentVisitor : visitor
        )
      );
    } else {
      // Add new visitor
      setVisitors([
        ...visitors,
        {
          ...currentVisitor,
          id: visitors.length + 1,
          visitDate: new Date().toLocaleDateString(),
        },
      ]);
    }
    handleClose();
  };

  const filteredVisitors = visitors.filter(
    (visitor) =>
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="visitor-container">
      <h2 className="mb-4">Visitor Management</h2>
      <div className="d-flex justify-content-between mb-3">
        {/* <Button variant="primary" onClick={() => handleAddEdit()}>
          <FaPlus /> Add Visitor
        </Button> */}
        <InputGroup className="w-50">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by name or purpose"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Purpose</th>
              <th>Contact Number</th>
              <th>Province</th>
              <th>City</th>
              <th>barangay</th>
              <th>Visit Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitors.map((visitor) => (
              <tr key={visitor.id}>
                <td>{visitor.id}</td>{" "}
                <td>
                  <div className="d-flex align-items-center">
                    {visitor.image ? (
                      <img
                        src={staff.image} //papalitan ng http
                        alt={staff.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          marginRight: "10px",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#ccc",
                          marginRight: "10px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          color: "#666",
                        }}
                      >
                        {visitor.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span>{visitor.name}</span>
                  </div>
                </td>
                <td>{visitor.gender}</td>
                <td>{visitor.dateOfBirth}</td>
                <td>{visitor.purpose}</td>
                <td>{visitor.contactNumber}</td>
                <td>{visitor.province}</td>
                <td>{visitor.city}</td>
                <td>{visitor.brgy}</td> <td>{visitor.visitDate}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleAddEdit(visitor)}
                  >
                    <FaEdit />
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(visitor.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentVisitor.id ? "Edit Visitor" : "Add Visitor"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {" "}
            <Form.Group className="mb-3">
              <Form.Label>Profile Image</Form.Label>{" "}
              {(imagePreview || currentVisitor.image) && (
                <div className="m-2 d-flex align-items-center justify-content-center">
                  <img
                    src={imagePreview || currentVisitor.image}
                    alt="Profile Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentVisitor.name || ""}
                onChange={(e) =>
                  setCurrentVisitor({ ...currentVisitor, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Purpose</Form.Label>
              <Form.Control
                type="text"
                value={currentVisitor.purpose || ""}
                onChange={(e) =>
                  setCurrentVisitor({
                    ...currentVisitor,
                    purpose: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                value={currentVisitor.contactNumber || ""}
                onChange={(e) =>
                  setCurrentVisitor({
                    ...currentVisitor,
                    contactNumber: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentVisitor.id ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal> */}
    </div>
  );
};

export default Visitor;
