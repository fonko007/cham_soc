import './App.css';
import Home from './Pages/Home';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Services from './Pages/Services';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './Pages/Admin';
import NotFound from './Pages/Notfound';
import News from './Pages/News';
import ArticlePage from './Pages/Article';
import ServicesInfo from './Pages/Servicesinfo';
import AdminDashboard from './Pages/AdminDashboard';
import Login from './Pages/Login';
import CameraPage from './Pages/Camera';

function App() {
  return (
    
    <div className="App">
      
      <ToastContainer></ToastContainer>
      <Router>
      <Routes>
        <Route path='/' exact element={<Home></Home>}></Route>
        <Route path='/services' exact element={<Services></Services>}></Route>
        <Route path='/news' exact element={<News></News>}></Route>
        <Route path='/admin' exact element={<Admin></Admin>}/>
        <Route path='/news/:id' exact element={<ArticlePage></ArticlePage>}></Route>
        <Route path='/servicesinfo' exact element={<ServicesInfo></ServicesInfo>}></Route>
        <Route path='/admin/dashboard' exact element={<AdminDashboard></AdminDashboard>}></Route>
        <Route path='/admin/login' exact element={<Login></Login>}></Route>
        <Route path='/camera' exact element={<CameraPage></CameraPage>}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
