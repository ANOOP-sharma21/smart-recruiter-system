const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const multer = require("multer");

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

//  CREATE candidate
router.post("/", upload.single("resume"), async (req, res) => {
  try {

    // 👇 ADD HERE
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const candidate = new Candidate({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      skills: req.body.skills.split(","),
      experience: req.body.experience,
      education: req.body.education,
      about: req.body.about,
      resume: req.file ? req.file.filename : "",
      status: "Pending"
    });

    await candidate.save();

    res.json({ message: "Saved ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

//  GET all candidates
router.get("/", async (req, res) => {
  const candidates = await Candidate.find();
  res.json(candidates);
});

//  UPDATE status
router.put("/:id", async (req, res) => {
  const updated = await Candidate.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(updated);
});

//  DELETE
router.delete("/:id", async (req, res) => {
  await Candidate.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;