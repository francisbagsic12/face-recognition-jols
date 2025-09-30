import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, InputGroup } from "react-bootstrap";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "../staff section/staff.css";

const Staff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentStaff, setCurrentStaff] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    province: "",
    city: "",
    brgy: "",
    position: "",
    department: "",
    email: "",
    image: null,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch staff data from API
    // For now, we'll use mock data
    const mockStaff = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: `Staff ${index + 1}`,
      gender: "male",
      purpose: `Purpose ${(index % 5) + 1}`,
      dateOfBirth: "january 1 2025",
      province: "Nueva Ecija",
      city: "Quezon",
      brgy: "San Miguel",
      position: `Position ${(index % 5) + 1}`,
      department: `Department ${(index % 4) + 1}`,
      email: `staff${index + 1}@example.com`,
    }));
    setStaffMembers(mockStaff);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setImagePreview(null);
  };
  const handleShow = () => setShowModal(true);

  const handleAddEdit = (staff = {}) => {
    setCurrentStaff(staff);
    setImagePreview(staff.image || null);
    handleShow();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentStaff({
        ...currentStaff,
        image: file,
      });
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      setStaffMembers(staffMembers.filter((staff) => staff.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStaff.id) {
      // Update existing staff
      setStaffMembers(
        staffMembers.map((staff) =>
          staff.id === currentStaff.id ? currentStaff : staff
        )
      );
    } else {
      // Add new staff
      setStaffMembers([
        ...staffMembers,
        { ...currentStaff, id: staffMembers.length + 1 },
      ]);
    }
    handleClose();
  };

  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const positions = ["Security Guard", "Teacher", "Faculty Staff"];
  const sex = ["male", "female"];
  return (
    <div className="staff-container">
      <h2 className="mb-4">Staff Management</h2>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={() => handleAddEdit()}>
          <FaPlus /> Add Staff
        </Button>
        <InputGroup className="w-50">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by name, position, or department"
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
              <th>Name</th> <th>Gender</th>
              <th>Date of Birth</th>
              <th>Province</th>
              <th>City</th>
              <th>barangay</th>
              <th>Position</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.id}</td>
                <td>
                  <div className="d-flex align-items-center">
                    {staff.image ? (
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
                        {staff.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span>{staff.name}</span>
                  </div>
                </td>{" "}
                <td>{staff.gender}</td>
                <td>{staff.dateOfBirth}</td>
                <td>{staff.province}</td>
                <td>{staff.city}</td>
                <td>{staff.brgy}</td>
                <td>{staff.position}</td>
                <td>{staff.email}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleAddEdit(staff)}
                  >
                    <FaEdit />
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(staff.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentStaff.id ? "Edit Staff" : "Add Staff"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {" "}
            <Form.Group className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {(imagePreview || currentStaff.image) && (
                <div className="mt-2">
                  <img
                    src={imagePreview || currentStaff.image}
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
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentStaff.name || ""}
                onChange={(e) =>
                  setCurrentStaff({ ...currentStaff, name: e.target.value })
                }
                required
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                value={currentStaff.position || ""}
                onChange={(e) =>
                  setCurrentStaff({
                    ...currentStaff,
                    position: e.target.value,
                  })
                }
                required
              />
            </Form.Group> */}{" "}
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                value={currentStaff.gender || ""}
                onChange={(e) =>
                  setCurrentStaff({
                    ...currentStaff,
                    gender: e.target.value,
                  })
                }
                required
              >
                {sex.map((sex) => (
                  <option key={sex} value={sex}>
                    {sex}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date Of birth</Form.Label>
              <Form.Control
                type="date"
                value={currentStaff.dateOfBirth || ""}
                onChange={(e) =>
                  setCurrentStaff({
                    ...currentStaff,
                    dateOfBirth: e.target.value,
                  })
                }
                required
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3">
              <Form.Label>Province</Form.Label>
              <Form.Control
                type="text"
                value={currentStaff.province || ""}
                onChange={(e) =>
                  setCurrentStaff({
                    ...currentStaff,
                    province: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={currentStaff.city || ""}
                onChange={(e) =>
                  setCurrentStaff({
                    ...currentStaff,
                    city: e.target.value,
                  })
                }
                required
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3">
              <Form.Label>barangay</Form.Label>
              <Form.Control
                type="text"
                value={currentStaff.brgy || ""}
                onChange={(e) =>
                  setCurrentStaff({
                    ...currentStaff,
                    brgy: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                as="select"
                value={currentStaff.position || ""}
                onChange={(e) =>
                  setCurrentStaff({
                    ...currentStaff,
                    position: e.target.value,
                  })
                }
                required
              >
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={currentStaff.department || ""}
                onChange={(e) =>
                  setCurrentStaff({
                    ...currentStaff,
                    department: e.target.value,
                  })
                }
                required
              />
            </Form.Group> */}{" "}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentStaff.email || ""}
                onChange={(e) =>
                  setCurrentStaff({ ...currentStaff, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentStaff.id ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Staff;
