import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { error } from "console";
const app = express();
app.use(cors());
app.use(express.json());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "faces");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const uploadFaces = multer({
  storage: storage,
});
// const fileFilter = (req, file, next) => {
//   if (file.mimetype.startswith("image/")) {
//     cb(null, null);
//   } else {
//     cb(new error("invalid file type,video cannot upload,image only"), false);
//   }
// };
// app.use((req, res, next) => {
//   const allowedLocalIps = ["192.168.0.1", "::1"];
//   const clientIp = req.ip;
//   if (allowedLocalIps.includes(clientIp)) {
//     next();
//   } else {
//     res.status(404).send("this is from local only");
//     if (req.path === "adminDashboard") {
//       return res.status(404).json({ mesage: "access denied" });
//     }
//     next();
//   }
// });
app.use(cors());
app.get("/faceCamera", (req, res) => {
  return res.send("this is a server");
});

app.post("/registerStudent", (req, res) => {
  return res.send("this is a server");
});
app.post("/registerStaff", (req, res) => {
  return res.send("this is a server");
});
app.post("/registerVisitor", (req, res) => {
  return res.send("this is a server");
});
app.listen(8081, async (req, res) => {
  console.log("erver running in port 8081");
});
