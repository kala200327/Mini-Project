const express = require('express');
const router = express.Router();
const Student = require('../models/student'); // Capital S

// CREATE
router.post('/', async (req, res) => {
  try {
    const newStudent = new Student(req.body); // different variable name
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// READ ALL
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});


// READ SINGLE
router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
});


// UPDATE
router.put('/:id', async (req, res) => {
  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedStudent);
});


// DELETE
router.delete('/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student Deleted" });
});

module.exports = router;