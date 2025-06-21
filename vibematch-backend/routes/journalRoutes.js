// routes/journalRoutes.js

import express from "express";
import { createJournal } from "../controllers/journalController.js";
import multer from "multer";

const router = express.Router();

// Setup multer disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

// Journal route with file upload
router.post("/", upload.single("file"), createJournal);

export default router;
