import { FcInternal, FcSearch, FcSpeaker } from "react-icons/fc";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import {baseURL} from "../utils/constant";

function HomePage() {
  const [keyword, setKeyWord] = useState("");
  const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";
  const [word, setWord] = useState("");

  //Notification - WordMark
  const [wordmark, setWordMark] = useState(true);

  const notify = () => {
    if (wordmark) {
      toast.success("Mark Word !", {
        position: toast.POSITION.TOP_CENTER,
      });

      let arrayWord = JSON.parse(localStorage.getItem("markword"));

      let objectWord = {
        cardName: word,
        definition: definition1,
      };

      if (arrayWord) {
        arrayWord.push(objectWord);
        localStorage.setItem("markword", JSON.stringify(arrayWord));
      } else {
        let array = [];
        array.push(objectWord);
        localStorage.setItem("markword", JSON.stringify(array));
      }

      setWordMark(false);

      axios.post(`${baseURL}/create`, {objectWord}).then((res)=>{
        console.log(res.data)
      })


    } else {
      toast.warning("Unmark Word !", {
        position: toast.POSITION.TOP_CENTER,
      });

      let arrayWord = JSON.parse(localStorage.getItem("markword"));
      arrayWord.forEach((item, index) => {
        if (item.cardName === word) {
          arrayWord.splice(item, 1);
        }
      });

      localStorage.setItem("markword", JSON.stringify(arrayWord));

      setWordMark(true);
    }
  };

  const [searchbtn, setSearchBtn] = useState(true);

  //Noun
  const [synonym1, setSynonym1] = useState("");
  const [definition1, setDefinition1] = useState("");
  const [example1, setExample1] = useState("");
  const [partOfSpeech1, setPartOfSpeech1] = useState("");
  const [phonetics1, setPhonetics1] = useState("");
  const [audio1, setAudio1] = useState("");

  //Verb
  const [synonym2, setSynonym2] = useState("");
  const [definition2, setDefinition2] = useState("");
  const [example2, setExample2] = useState("");
  const [partOfSpeech2, setPartOfSpeech2] = useState("");
  const [phonetics2, setPhonetics2] = useState("");
  const [audio2, setAudio2] = useState("");

  //Function Find Word
  const handleFindWord = async () => {
    try {
      setWordMark(true);
      const resultFromAPI = await axios.get(`${API_URL}/${keyword}`);
      if (resultFromAPI.data.length > 1) {
        const result = resultFromAPI.data[0];

        setWord(result.word);

        // Noun
        setDefinition1(result.meanings[0].definitions[0].definition);
        setExample1(result.meanings[0].definitions[0].example);

        const sysno1 = result.meanings[0].synonyms;
        if (sysno1) {
          setSynonym1(sysno1.join(","));
        } else {
          setSynonym1("empty");
        }

        setPartOfSpeech1(result.meanings[0].partOfSpeech);
        setPhonetics1(result.phonetic);

        if (result.phonetics[0]) {
          setAudio1(result.phonetics[0].audio);
        }

        //Verb
        setDefinition2(result.meanings[1].definitions[1].definition);
        setExample2(result.meanings[1].definitions[1].example);

        const sysno2 = result.meanings[1].synonyms;
        if (sysno2) {
          setSynonym2(sysno2.join(","));
        } else {
          setSynonym2("empty");
        }

        setPartOfSpeech2(result.meanings[1].partOfSpeech);
        setPhonetics2(result.phonetic);

        if (result.phonetics[1]) {
          setAudio2(result.phonetics[1].audio);
        }

        document.querySelector(".NounType").style.display = "block";
        document.querySelector(".OtherType").style.display = "block";
      } else {
        const result = resultFromAPI.data[0];

        setWord(result.word);

        // Noun
        setDefinition1(result.meanings[0].definitions[0].definition);
        setExample1(result.meanings[0].definitions[0].example);

        const sysno1 = result.meanings[0].synonyms;
        if (sysno1) {
          setSynonym1(sysno1.join(","));
        } else {
          setSynonym1("Empty");
        }

        setPartOfSpeech1(result.meanings[0].partOfSpeech);
        setPhonetics1(result.phonetic);

        if (result.phonetics[0]) {
          setAudio1(result.phonetics[0].audio);
        }

        document.querySelector(".NounType").style.display = "block";
        document.querySelector(".OtherType").style.display = "none";

        setDefinition2("");
        setExample2("");
        setSynonym2("");
        setPartOfSpeech2("");
        setAudio2("");
        setPhonetics2("");
      }
        document.querySelector(".resultContent").style.display = "block";
    } catch (err) {
      document.querySelector(".resultContent").style.display =
        "none !important";
      toast.warning("Your word not found !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    setKeyWord("");
    setSearchBtn(true);
  };

  //Play Audio
  const playAudio = async (inputAudio) => {
    try {
      if (inputAudio) {
        const playAudio = new Audio(inputAudio.audio1 || inputAudio.audio2);
        playAudio.play();
      } else {
        alert("No found sound !");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="TopHeading" style={{ width: "500px" }}>
        <h2>Enter Your Word</h2>
        <p>
          Please input your english word below &nbsp;
          <FcInternal />
        </p>

        <div className="inputText">
          <FcSearch />
          <input
            type="text"
            placeholder="Text Here..."
            style={{ width: "75%", marginRight: "10px" }}
            value={keyword}
            onChange={(e) => {
              setKeyWord(e.target.value);
              setSearchBtn(false);
            }}
          ></input>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleFindWord}
            disabled={searchbtn}
          >
            Search
          </button>
        </div>

        <div
          className="resultContent"
          style={{ marginTop: "40px", display: "none" }}
        >
          <h6 style={{ fontWeight: "bold" }}>
            Searh results for "{word}"&nbsp;
            <FcSearch />
          </h6>

          <div
            className="content"
            style={{
              border: "1px solid #ccc",
              position: "relative",
              backgroundColor: "#ffffff",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "15px",
              boxShadow: "1px 1px 2px 0.5px grey",
            }}
          >
            <h6
              className="fw-bold"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {word}
              {wordmark ? (
                <FaRegBookmark
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    position: "absolute",
                    right: "10",
                  }}
                  onClick={notify}
                />
              ) : (
                <FaBookmark
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    position: "absolute",
                    right: "10",
                  }}
                  onClick={notify}
                />
              )}

              <ToastContainer autoClose={1000} />
            </h6>
            <p style={{ fontSize: "13px", marginTop: "15px" }}>
              {/* Noun */}
              <div className="NounType" style={{ display: "none" }}>
                <h4>
                  {" "}
                  ({partOfSpeech1}) - {phonetics1} -{" "}
                  <button
                    onClick={() => {
                      playAudio({ audio1 });
                    }}
                    style={{ borderRadius: "7px", borderColor: "#4ab89f" }}
                  >
                    <FcSpeaker />
                  </button>
                </h4>
                {definition1}
                <p>
                  <span className="fw-bold">Example: </span> {example1}
                </p>

                <p>
                  <span className="fw-bold">See synonyms:</span>
                  <p>{synonym1}</p>
                </p>
              </div>

              {/* Verb */}
              <div className="OtherType" style={{ display: "none" }}>
                <h4>
                  {" "}
                  ({partOfSpeech2}) - {phonetics2} -{" "}
                  <button
                    onClick={() => {
                      playAudio({ audio2 });
                    }}
                    style={{ borderRadius: "7px", borderColor: "#4ab89f" }}
                  >
                    <FcSpeaker />
                  </button>
                </h4>
                {definition2}
                <p>
                  <span className="fw-bold">Example: </span> {example2}
                </p>

                <p>
                  <span className="fw-bold">See synonyms:</span>
                  <p>{synonym2}</p>
                </p>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
