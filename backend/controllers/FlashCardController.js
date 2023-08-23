const FlashCardModel = require("../models/FlashCard");

//Read Card
module.exports.getCard = async(req, res) => {
    const cards = await FlashCardModel.find();
    res.send(cards);
}

//Create Card
module.exports.createCard = async(req, res) => {
	//Cú pháp destructuring nên tuẩn thủ viết đúng tên biến. VD : const {cardName, definition} = req.body -> Phải truyền vào 2 biến giống tên như vậy trong {}
    const card = req.body;

    FlashCardModel.create(card.objectWord)
    .then((data) => {
        console.log("Create Success !");
        res.status(200).send(data);
    })
    .catch((err) => {
        console.log(err);
        res.send({error: err, msg: "Something went wrong !"})
    })
}

//Update Card
module.exports.updateCard = async(req, res) => {
    const {id} = req.params;
    const card = req.body;

    FlashCardModel.findByIdAndUpdate(id, card.objectWord)
    .then(() => res.send("Updated Successfully"))
    .catch((err) => {
        console.log(err);
        res.send({error: err, msg: "Something went wrong !"});
    })
}

//Delete Card
module.exports.deleteCard = async(req, res) => {
    const {id} = req.params;

    FlashCardModel.findByIdAndDelete(id)
    .then(() => res.send("Delete Successfully"))
    .catch((err) => {
        console.log(err)
        res.send({error: err, msg:"Something went wrong !"})
    })
}