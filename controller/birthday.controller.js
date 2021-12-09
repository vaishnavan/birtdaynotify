const Birthday = require('../model/birthdaySchema.model');
const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

router.post("/postBirth", upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log("helllo")
        console.log(result)

        let myBirthday = new Birthday({
            username: req.body.username,
            dob: req.body.dob,
            profile: result.secure_url,
            cloudinary_id: result.public_id,
        });
        await myBirthday.save();

        return res.status(200).json(myBirthday);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
})

module.exports = router;


