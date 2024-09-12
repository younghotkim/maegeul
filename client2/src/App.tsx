//client2/src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MaeGeul from "./pages/MaeGeul/Maeguel";
import AIWriting from "./pages/AIWriting/AIWriting";
import Article from "./pages/Archiving/Article";
import MgWriting from "./pages/MaeGeul/MgWriting";
import EmotionForm from "./components/EmotionForm";
import Mypage from "./pages/Auth/Mypage";
import MainLogin from "./pages/Auth/MainLogin";
import MainSignup from "./pages/Auth/MainSignup";
import EmailLogin from "./pages/Auth/EmailLogin";
import SignupForm from "./pages/Auth/Signup";
import SignupForm2 from "./pages/Auth/Signup2";
import SignupForm3 from "./pages/Auth/Signup3";
import SignupForm4 from "./pages/Auth/Signup4";
import Logout from "./pages/Auth/Logout";
import LoginSuccess from "./pages/Auth/LoginSuccess";
import LoginTest from "./pages/Auth/LoginTest";

//Context
import { HighlightProvider } from "./context/HighlightContext"; // PostProvider 임포트
import { MoodProvider } from "./context/MoodContext";
import { UserProvider } from "./context/UserContext";

const App: React.FC = () => {
  return (
    <UserProvider>
      <HighlightProvider>
        <MoodProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/maegeul" element={<MaeGeul />} />
              <Route path="/emotionForm" element={<EmotionForm />} />
              <Route path="/article" element={<Article />} />
              <Route path="/mgwriting" element={<MgWriting />} />
              <Route path="/login/success" element={<LoginSuccess />} />
              <Route path="/email-login" element={<EmailLogin />} />
              <Route path="/logintest" element={<LoginTest />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/mainlogin" element={<MainLogin />} />
              <Route path="/mainsignup" element={<MainSignup />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/signup2" element={<SignupForm2 />} />
              <Route path="/signup3" element={<SignupForm3 />} />
              <Route path="/signup4" element={<SignupForm4 />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Router>
        </MoodProvider>
      </HighlightProvider>
    </UserProvider>
  );
};

export default App;
