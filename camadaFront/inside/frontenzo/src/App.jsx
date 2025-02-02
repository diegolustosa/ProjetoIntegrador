import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Cadastro from './Components/Cadastro';
import RecuperarSenha from './Components/RecuperarSenha'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} /> 
      </Routes>
    </Router>
  );
}

export default App;
