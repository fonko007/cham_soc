import './App.css';
import Home from './Pages/Home';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Services from './Pages/Services';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './Pages/Notfound';
import News from './Pages/News';
import ArticlePage from './Pages/Article';
import ServicesInfo from './Pages/Servicesinfo';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Login from './Pages/Login';
import CameraPage from './Pages/Camera';
import CreateArticle from './Pages/Admin/CreateArticle';
import Contact from './Pages/Contact';
import ArticleManagement from './Pages/Admin/AdminArticles';
import EditArticle from './Pages/Admin/EditArticle';

function App() {
  return (
    
    <div className="App">
      
      <ToastContainer></ToastContainer>
      <Router>
      <Routes>
        <Route path='/' exact element={<Home></Home>}></Route>
        <Route path='/login' exact element={<Login></Login>}></Route>
        <Route path='/services' exact element={<Services></Services>}></Route>
        <Route path='/contact' exact element={<Contact></Contact>}></Route>
        <Route path='/news' exact element={<News></News>}></Route>
        <Route path='/admin/carticles' exact element={<CreateArticle></CreateArticle>}/>
        <Route path='/admin/articlesmanage' exact element={<ArticleManagement></ArticleManagement>}></Route>
        <Route path='/news/:id' exact element={<ArticlePage></ArticlePage>}></Route>
        <Route path='/servicesinfo' exact element={<ServicesInfo></ServicesInfo>}></Route>
        <Route path='/admin/dashboard' exact element={<AdminDashboard></AdminDashboard>}></Route>
        <Route path='/admin/login' exact element={<Login></Login>}></Route>
        <Route path='/camera' exact element={<CameraPage></CameraPage>}></Route>
        <Route path='/admin/articles/:id/edit' exact element={<EditArticle></EditArticle>}/> {/* Add route for editing articles */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
