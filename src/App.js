import './App.css';
import Navbar from './Components/Navbar';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Skills from './Pages/skills';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Home/>
      <About />
      <Skills/>
      <Projects/>
      <Contact/>
    </div>
  );
}

export default App;