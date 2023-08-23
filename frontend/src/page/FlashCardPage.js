import { useEffect, useState } from "react";
import React from "react";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { FcFlowChart } from "react-icons/fc";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../utils/constant";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

function FlashCardPage() {
  const [words, setWords] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);

  const [cardName, setCardName] = useState("");
  const [definition, setDefinition] = useState("");
  const [indexCard, setIndexCard] = useState(0);
  const [cardLength, setCardLength] = useState(0);

  const [wordinput, setWordInput] = useState("");
  const [definitioninput, setDefinitionInput] = useState("");

  const [updateid, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setWords(res.data);
      setCardName(res.data[indexCard] ? res.data[indexCard].cardName : '');
      setDefinition(res.data[indexCard].definition);
      setCardLength(res.data.length);
    });
  }, [updateUI]);

  //Add word
  const addWord = () => {
    let objectWord = {
      cardName: wordinput,
      definition: definitioninput,
    };
    alert("Add Vocabulary Successful !");
    axios.post(`${baseURL}/create`, { objectWord }).then((res) => {
      console.log(res.data);

      setWordInput("");
      setDefinitionInput("");
      setUpdateUI((prevState) => !prevState);
    });
  };

  //When click update Icon
  const updateMode = (id, cardName, definition) => {
    setWordInput(cardName);
    setDefinitionInput(definition);
    setUpdateId(id);
  };

  //Update Card
  const updateWord = () => {
    let objectWord = {
      cardName: wordinput,
      definition: definitioninput,
    };

    console.log(objectWord)
    axios
      .put(`${baseURL}/update/${updateid}`, { objectWord })
      .then((res) => {
        console.log(res.data);
        setWordInput("");
        setDefinitionInput("");
        setUpdateId(null);
        setUpdateUI((prevState) => !prevState);
        alert('Update Success !')
      })
      .catch((e) => console.log(e));
  };

  const removeCard = (id) => {
    axios
      .delete(`${baseURL}/delete/${id}`)
      .then((res) => {
        alert("Delete Success !");
        console.log(res);
        setUpdateUI((prevState) => !prevState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Button Nav NextCard
  const nextCard = () => {
    setIndexCard((prev) => {
      if (cardLength - 1 === prev) {
        return 0;
      } else {
        return prev + 1;
      }
    });
    setUpdateUI((prevState) => !prevState);
  };

  // Button Nav PrevCard
  const prevCard = () => {
    setIndexCard((prev) => {
      if (prev === 0) {
        return cardLength - 1;
      } else {
        return prev - 1;
      }
    });
    setUpdateUI((prevState) => !prevState);
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "70px",
        flexDirection: "column",
        marginBottom: "40px",
      }}
    >
      {/* Flash Card */}
      <div className="flashCard">
        <h1
          style={{
            textAlign: "center",
            color: "#4ab89f",
            marginBottom: "20px",
          }}
        >
          Flash Card
        </h1>

        {/* Content Card */}
        <div className="container_flashCard">
          <div
            class="card border-success mb-3"
            style={{ maxWidth: "18rem;", height: "150px" }}
          >
            <div class="card-header fw-bold">{cardName}</div>
            <div class="card-body text-success">
              <p class="card-text">{definition}</p>
            </div>
          </div>

          {/* Button Navigation */}

          <button className="btn_nav_left" onClick={prevCard}>
            <FaAngleLeft />
          </button>
          <button className="btn_nav_right" onClick={nextCard}>
            <FaAngleRight />
          </button>
        </div>
      </div>

      <div
        className="ContainerBottom"
        style={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {/* List Word Marked */}
        <div className="ListWord" style={{ width: "400px" }}>
          <h2 style={{ marginBottom: "30px" }}>
            Word List <FcFlowChart />
          </h2>
          <ol
            class="list-group list-group-numbered"
            style={{ overflowY: "scroll", maxHeight: "350px" }}
          >
            {words.length !== 0 ? (
              words.map((item, index) => (
                <li
                  class="list-group-item d-flex justify-content-between align-items-start"
                  key={index}
                >
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">{item.cardName}</div>
                    {item.definition}
                  </div>
                  <span
                    class="badge rounded-pill"
                    style={{
                      fontSize: "15px",
                      backgroundColor: "white",
                      border: "2px solid #4ab89f",
                    }}
                  >
                    <FaPenToSquare
                      onClick={() => {
                        updateMode(item._id, item.cardName, item.definition);
                      }}
                      className="editPen"
                      style={{ marginRight: "20px", cursor: "pointer" }}
                    />
                    <FaTrash
                      className="deleteTrash"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        removeCard(item._id);
                      }}
                    />
                  </span>
                </li>
              ))
            ) : (
              <h6 style={{ color: "#4ab89f", fontStyle: "italic" }}>
                Empty Word
              </h6>
            )}
          </ol>
        </div>

        <div
          className="RightCrud"
          style={{
            backgroundColor: "#fff2af",
            width: "450px",
            padding: "30px",
            borderRadius: "10px",
            height: "fit-content",
          }}
        >
          <h4 style={{ color: "#4ab89f" }}>Add/Edit Vocabulary</h4>
          <div class="mb-2">
            <label for="exampleInputEmail1" class="form-label">
              Word:
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              minlength="2"
              value={wordinput}
              onChange={(e) => setWordInput(e.target.value)}
              required
            />
          </div>
          <div class="mb-2">
            <label for="exampleInputPassword1" class="form-label">
              Definition:
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              value={definitioninput}
              onChange={(e) => setDefinitionInput(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            class="btn btn-success"
            onClick={updateid ? updateWord : addWord}
          >
            {updateid ? 'Update Word' : 'Add Word'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlashCardPage;
