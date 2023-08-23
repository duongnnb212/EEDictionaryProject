import { Routes, Route, Link } from "react-router-dom";

import HomePage from "./page/HomePage";
import FlashCardPage from "./page/FlashCardPage";

function App() {
  const clickTab1 = () => {
    document.querySelector(".tab1").style.backgroundColor = "#56bfa7";
    document.querySelector(".tab1").style.borderRadius = "10px";
    document.querySelector(".tab1").style.padding = "10px";
    document.querySelector(".tab1").style.boxShadow = "0px 1px 1px 1px #ccc";

    document.querySelector(".tab2").style.backgroundColor = "white";
    document.querySelector(".tab2").style.borderRadius = "0";
    document.querySelector(".tab2").style.boxShadow = "";
    document.querySelector(".span2").style.color = "#56bfa7";
    document.querySelector(".span1").style.color = "white";
  };

  const clickTab2 = () => {
    document.querySelector(".tab2").style.backgroundColor = "#56bfa7";
    document.querySelector(".tab2").style.borderRadius = "10px";
    document.querySelector(".span2").style.color = "#fff";
    document.querySelector(".tab2").style.padding = "10px";
    document.querySelector(".tab2").style.boxShadow = "0px 1px 1px 1px #ccc";

    document.querySelector(".span1").style.color = "#56bfa7";
    document.querySelector(".tab1").style.backgroundColor = "white";
    document.querySelector(".tab1").style.borderRadius = "0";
    document.querySelector(".tab1").style.boxShadow = "";
  };

  return (
    <div className="container" style={{ backgroundColor: "#f9ffff" }}>
      {/* Header */}
      <nav
        class="navbar navbar-expand-lg navbar-light"
        style={{ marginBottom: "30px" }}
      >
        <div class="container-fluid">
          <p
            style={{ fontSize: "30px", color: "#4ab89f ", fontWeight: "bold" }}
          >
            English Dictionary
          </p>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse"
            id="navbarNav"
            style={{ marginLeft: "60%" }}
          >
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link
                  onClick={clickTab1}
                  class="nav-link fw-bold tab1"
                  aria-current="page"
                  to="/"
                  style={{
                    marginRight: "20px",
                    backgroundColor: "#56bfa7",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: "0px 1px 1px 1px #ccc",
                  }}
                >
                  <span style={{ color: "white" }} className="span1">Home</span>
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link fw-bold tab2"
                  to="/flashCard"
                  onClick={clickTab2}
                >
                  <span className="span2">Flash Card</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        {/*  Theo dang in hoa - Element not follow write form CamelCase*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/flashCard" element={<FlashCardPage />} />
      </Routes>
    </div>
  );
}

export default App;
