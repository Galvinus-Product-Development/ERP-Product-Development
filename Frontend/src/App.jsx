import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AboutIndex from "./components/AboutUsPage/AboutIndex";
import HomePageIndex from "./components/HomePage/HomePageIndex";
import Layout from "./Layout";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePageIndex />} />
          <Route path="about" element={<AboutIndex />} />
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
