import "./App.css";

import { FormCV } from "./components/FormCV";
import { GetCV } from "./components/GetCV";
import { Home } from "./components/Home";
import { Navbar } from "./layouts/Navbar";

import { Routes, Route } from "react-router-dom";
import { Footer } from "./layouts/Footer";

const App = () => {
  return (
    <>
      {" "}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/createCV" element={<FormCV />}></Route>
        <Route path="createCV/cv/:cvname/check" element={<GetCV type="check"/>}></Route>
        <Route path="/cv/:cvname/download" element={<GetCV type="download"/>}></Route>
        <Route path="/cv/:cvname/update" element={<GetCV type="update" />}></Route>
        <Route path="/cv/:cvname/translate" element={<GetCV type="translate" />}></Route>

      </Routes>

      <Footer />
    </>
  );
};

export default App;
