
import './App.css'
import Navbar from './Pages/Navbar'
import Acceuil from './Pages/Acceuil'
import {  Routes, Route} from "react-router-dom";
import Form from './Pages/Form';
import Quiz from './Pages/Quiz';
import Confirmation from './Pages/Confirmation';
import QuizStart from './Pages/QuizStart';
import QuizResult from './Pages/QuizResult';
import AdminDashboard from './Pages/AdminDashboard';
import Login from './Pages/Login';
import { useLocation } from "react-router-dom";




function App() {
  const location = useLocation();

  // Add the paths where you DON'T want to see the navbar
  const noNavbarPaths = ["/login", "/admin/dashboard"];

  const showNavbar = !noNavbarPaths.includes(location.pathname);

  return (
   <>
    {showNavbar && <Navbar />}
    
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/form" element={<Form />} />
        <Route path="/formulaire" element={<Form />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/start" element={<QuizStart />} />
        <Route path="/quiz/result" element={<QuizResult />} />
        <Route path="/login" element={<Login />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        
       
     
      </Routes>

    
   </>
  )
}

export default App
