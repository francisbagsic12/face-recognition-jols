import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, InputGroup } from "react-bootstrap";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "../student section/student.css";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentStudent, setCurrentStudent] = useState({
    name: "",
    position: "",
    gender: "",
    dateOfBirth: "",
    province: "",
    city: "",
    brgy: "",
    yearLevel: "",
    section: "",
    email: "",
    guardian_contact: "",
    image: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentStudent({
        ...currentStudent,
        image: file,
      });
      setImagePreview(URL.createObjectURL(file));
    }
  };
  console.log(currentStudent);
  useEffect(() => {
    // Fetch students data from API
    // For now, we'll use mock data
    const mockStudents = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: `Student ${index + 1}`,
      gender: "male",
      dateOfBirth: "january 1 2025",
      province: "Nueva Ecija",
      city: "Quezon",
      brgy: "San Miguel",
      rollNumber: `R00${index + 1}`,
      course: `section${(index % 5) + 1}`,
      year: `grade${(index % 4) + 1}`,
    }));
    setStudents(mockStudents);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setImagePreview(null);
  };
  const handleShow = () => setShowModal(true);

  const handleAddEdit = (student = {}) => {
    setCurrentStudent(student);
    setImagePreview(student.image || null);
    handleShow();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStudent.id) {
      // Update existing student
      setStudents(
        students.map((student) =>
          student.id === currentStudent.id ? currentStudent : student
        )
      );
    } else {
      // Add new student
      setStudents([
        ...students,
        { ...currentStudent, id: students.length + 1 },
      ]);
    }
    handleClose();
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-container">
      <h2 className="mb-4">Student Management</h2>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={() => handleAddEdit()}>
          <FaPlus /> Add Student
        </Button>
        <InputGroup className="w-50">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by name or roll number"
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
              <th>Roll Number</th>
              <th>Date of Birth</th>
              <th>Section</th>
              <th>Province</th>
              <th>City</th>
              <th>barangay</th>
              <th>Year Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>{" "}
                <td>
                  <div className="d-flex align-items-center">
                    {student.image ? (
                      <img
                        src={student.image} //papalitan ng http
                        alt={student.name}
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
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span>{student.name}</span>
                  </div>
                </td>
                <td>{student.gender}</td>
                <td>{student.rollNumber}</td>
                <td>{student.dateOfBirth}</td>
                <td>{student.course}</td>
                <td>{student.province}</td>
                <td>{student.city}</td>
                <td>{student.brgy}</td>
                <td>{student.year}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleAddEdit(student)}
                  >
                    <FaEdit />
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(student.id)}
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
            {currentStudent.id ? "Edit Student" : "Add Student"}
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
              {(imagePreview || currentStudent.image) && (
                <div className="mt-2">
                  <img
                    src={imagePreview || currentStudent.image}
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
                value={currentStudent.name || ""}
                onChange={(e) =>
                  setCurrentStudent({ ...currentStudent, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent.rollNumber || ""}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    rollNumber: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent.course || ""}
                onChange={(e) =>
                  setCurrentStudent({
                    ...currentStudent,
                    course: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent.year || ""}
                onChange={(e) =>
                  setCurrentStudent({ ...currentStudent, year: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {currentStudent.id ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Student;
