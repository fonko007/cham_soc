import './App.css';
import Bookings from './Pages/Bookings';
import Home from './Pages/Home';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Services from './Pages/Services';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Admin from './Pages/Admin';
import NotFound from './Pages/Notfound';
import Dashboard from './Pages/Dashboard';
import News from './Pages/News';
function App() {
  return (
    
    <div className="App">
      
      <ToastContainer></ToastContainer>
      <Router>
      <Routes>
        <Route path="/login" exact element={<Login></Login>}/>
        <Route path='/register' exact element={<Register></Register>}/>
        
        <Route path='/' exact element={<Home></Home>}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/bookings' exact element={<Bookings></Bookings>}></Route>
        <Route path='/services' exact element={<Services></Services>}></Route>
        <Route path='/news' exact element={<News></News>}></Route>
        <Route path='/news/:title' exact element={<News></News>}></Route>
        <Route path='/admin' exact element={<Admin></Admin>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
