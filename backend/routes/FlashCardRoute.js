const express = require("express");

const {
    getCard,
    createCard,
    updateCard,
    deleteCard
} = require("../controllers/FlashCardController");

const router = express.Router();

//Middle
router.get("/get",getCard);
router.post("/create",createCard);
router.put("/update/:id",updateCard);
router.delete("/delete/:id", deleteCard);

module.exports = router;

