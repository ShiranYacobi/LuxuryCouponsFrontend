import "./App.css";
import Header from "./Components/LayoutArea/Header/Header";
import Footer from "./Components/LayoutArea/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Components/LayoutArea/Routing/Routing";
import MenuManager from "./Components/MainArea/Menu/MenuManager";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <aside>
          <MenuManager />
        </aside>
        <header id="header">
          <Header />
        </header>
        <section>
          <Routing />
        </section>
        <footer id="footer">
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
