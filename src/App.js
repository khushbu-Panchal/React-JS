import './App.css';
import Create from './Component/Create.js';
import Read from './Component/Read.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Create />}></Route>
          <Route exact path="/:id" element={<Create />}></Route>
          <Route exact path="/read" element={<Read />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
