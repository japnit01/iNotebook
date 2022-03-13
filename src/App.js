import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home';
import About from './components/About';
import NoteState from './Context/notes/Notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";




function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert message = "Hello!!" type = "info"/>
    <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route exact path="/about" element={<About />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
  </NoteState>

    </>
  );
}

export default App;
