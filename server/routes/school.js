const router = require("express").Router();
let School = require("../models/school.modal");

router.route("/").get(async (req, res) => {
  try {
    var school = await School.find();

    res.json(school);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/generate-data").get((req, res) => {
  let city = [
    "Jamshedpur",
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Pune",
    "Mangalore",
  ];
  let state = ["KA", "MH", "UP", "MP", "TN", "BR"];
  let pincode = [560001, 560025, 831009, 200142, 100401, 821008];
  let courses = [
    "Computer",
    "Electrical",
    "Electronics",
    "Civil",
    "Mechanical",
    "Medical",
  ];

  for (let i = 1; i <= 100; i++) {
    let randomCourses = [
      "Computer",
      "Electrical",
      "Electronics",
      "Civil",
      "Mechanical",
      "Medical",
    ];

    let schoolObj = {
      id: i,
      name: "School " + i,
      founded: String(Math.floor(100000 + Math.random() * 900000)).substring(
        0,
        4
      ),
      location: {
        address: "Address " + i,
        country: "India",
        city: city[Math.floor(Math.random() * 5) + 1],
        state: state[Math.floor(Math.random() * 5) + 1],
        pincode: pincode[Math.floor(Math.random() * 5) + 1],
      },
      ratings: Math.floor(Math.random() * 5) + 1,
      courses: [
        "Computer",
        "Electrical",
        "Electronics",
        "Civil",
        "Mechanical",
        "Medical",
      ].splice(
        ([
          "Computer",
          "Electrical",
          "Electronics",
          "Civil",
          "Mechanical",
          "Medical",
        ].length *
          Math.random()) |
          0,
        3
      ),
    };

    let studentArry = [];
    for (let j = 1; j <= 100; j++) {
      let studentObj = {
        id: j,
        name: "Student " + j,
        roll_number: String(
          Math.floor(100000 + Math.random() * 900000)
        ).substring(0, 3),
        batch: String(Math.floor(100000 + Math.random() * 900000)).substring(
          0,
          4
        ),
        course: courses[Math.floor(Math.random() * 6) + 1],
      };
      studentArry.push(studentObj);
    }
    schoolObj.students = studentArry;
    // schoolArry.push(schoolObj);
    const newSchool = new School(schoolObj);

    newSchool
      .save()
      .then(() => {})
      .catch((err) => res.status(400).json("Error: " + err));
  }

  res.json("School added!");
});

router.route("/overview").get(async (req, res) => {
  try {
    var stateData = await School.aggregate([
      { $group: { _id: "$location.state", value: { $sum: 1 } } },
    ]);

    var courseData = await School.aggregate([
      {
        $unwind: "$courses",
      },
      { $group: { _id: "$courses", value: { $sum: 1 } } },
    ]);

    res.status(200).json({ stateData, courseData });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/course/:id").get(async (req, res) => {
  try {
    var schools = await School.find({ courses: { $all: [req.params.id] } });

    var graphData = await School.aggregate([
      {
        $unwind: "$courses",
      },
      { $group: { _id: "$courses", value: { $sum: 1 } } },
    ]);

    res.json({ schools, graphData });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/state/:id").get(async (req, res) => {
  try {
    var schools = await School.find({
      "location.state": { $all: [req.params.id] },
    });

    var graphData = await School.aggregate([
      { $group: { _id: "$location.state", value: { $sum: 1 } } },
    ]);

    res.json({ schools, graphData });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    var school = await School.findById(req.params.id);

    res.json(school);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
