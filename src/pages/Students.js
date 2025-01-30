import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  Box,
} from "@mui/material";
import Sidebar from "../components/Sidebar"; // Import Sidebar

const Students = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    section: "",
    roll: "",
  });
  const [currentStudent, setCurrentStudent] = useState(null); // For editing
  const navigate = useNavigate();

  // Fetch students from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      setStudents(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchStudents();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirect to login after logout
  };

  // Add new student
  const handleAddStudent = async () => {
    await addDoc(collection(db, "students"), newStudent);
    setOpen(false);
    setNewStudent({ name: "", class: "", section: "", roll: "" }); 
    const querySnapshot = await getDocs(collection(db, "students")); 
    setStudents(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  
  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    setNewStudent(student); 
    setEditOpen(true);
  };

  // Update student details
  const handleUpdateStudent = async () => {
    const studentRef = doc(db, "students", currentStudent.id);
    await updateDoc(studentRef, newStudent);
    setEditOpen(false);
    setNewStudent({ name: "", class: "", section: "", roll: "" }); 
    const querySnapshot = await getDocs(collection(db, "students"));
    setStudents(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  // Delete a student
  const handleDeleteStudent = async (id) => {
    const studentRef = doc(db, "students", id);
    await deleteDoc(studentRef);
    const querySnapshot = await getDocs(collection(db, "students"));
    setStudents(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar /> {/* Sidebar added */}
      <div style={{ marginLeft: "220px", padding: "20px", flexGrow: 1 }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          style={{ marginLeft: "10px" }}
        >
          Add Student
        </Button>

        {/* Student Table */}
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Roll</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.roll}</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      onClick={() => handleEditStudent(student)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Student Modal */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              boxShadow: 24,
              p: 4,
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Name"
              fullWidth
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <TextField
              label="Class"
              fullWidth
              value={newStudent.class}
              onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
            />
            <TextField
              label="Section"
              fullWidth
              value={newStudent.section}
              onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
            />
            <TextField
              label="Roll"
              fullWidth
              value={newStudent.roll}
              onChange={(e) => setNewStudent({ ...newStudent, roll: e.target.value })}
            />
            <Button variant="contained" color="primary" onClick={handleAddStudent}>
              Submit
            </Button>
          </Box>
        </Modal>

        {/* Edit Student Modal */}
        <Modal open={editOpen} onClose={() => setEditOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              boxShadow: 24,
              p: 4,
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Name"
              fullWidth
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <TextField
              label="Class"
              fullWidth
              value={newStudent.class}
              onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
            />
            <TextField
              label="Section"
              fullWidth
              value={newStudent.section}
              onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
            />
            <TextField
              label="Roll"
              fullWidth
              value={newStudent.roll}
              onChange={(e) => setNewStudent({ ...newStudent, roll: e.target.value })}
            />
            <Button variant="contained" color="primary" onClick={handleUpdateStudent}>
              Update
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Students;
