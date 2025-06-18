import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInForm from './components/Signin';
import SignUpForm from './components/Signup';
import NotFound from './components/NotFound';
import Nest from './components/Nest'
import AddContentPage from './components/Addcontent';
import ShareBrainModal from './components/share';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInForm/>} />
        <Route path="/signup" element={<SignUpForm/>} />
        <Route path="/content" element={<Nest/>} />
        <Route path="/content/addcontent" element={<AddContentPage />} />
        <Route path="/content/share" element={<ShareBrainModal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;
