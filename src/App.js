import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';
import BlogDetails from './BlogDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //V6 
import NotFound from './NotFound';
import EditBlog from './EditBlog';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            {/* Determines path home page after url */}
            <Route exact path="/" element={<Home />}> </Route> 
            <Route path="/create" element={<Create />}> </Route>
            <Route path="/blogs/:id" element={<BlogDetails />}> </Route>
            <Route path="/blogs/:id/edit" element={<EditBlog />}> </Route>
            
            {/* Page used for catching non-routed urls */}
            <Route path="*" element={<NotFound />}></Route>   
          </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
