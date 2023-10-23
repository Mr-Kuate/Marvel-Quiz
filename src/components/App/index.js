import '../../App.css';
import Header from '../Header';
import Landing from '../Landing';
import Footer from '../Footer';
import Welcome from '../Welcome';
import Login from '../Login';
import SignUp from '../SignUp';
import ErrorPage from '../ErrorPage';
import ForgetPassword from '../ForgetPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IconContext } from 'react-icons';

function App() {


  return (
      <Router>
        <IconContext.Provider value={{style: {verticalAlign:'middle'}}}>
      
          <Routes>
              <Route path="/" element={<Landing/>}/>
              <Route path="/welcome" element={<Welcome/>}/>
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/forgetpassword" element={<ForgetPassword/>} />
              <Route path="*" element={<ErrorPage/>} />
          </Routes>

        </IconContext.Provider>
      </Router>

  );
}
 
export default App;
