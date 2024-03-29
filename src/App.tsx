import "./App.css";
import NavBar from "./components/NavBar.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer.js";
import Main from "./components/Main.js";

const App = () => {
  return (
    <div className="w-100 justify-content-between d-flex flex-column">
      <header>
        <NavBar />
      </header>
      <main className="flex-grow-1 bg-black">
        <Main />
      </main>
      <Footer />
    </div>
  );
};

export default App;
