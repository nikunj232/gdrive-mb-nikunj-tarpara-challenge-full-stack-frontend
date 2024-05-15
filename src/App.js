import logo from './logo.svg';
import './App.scss';
import AppRouter from './router/Router';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import Layout from './Layout';

function App() {
  return (<>
    {/* Your app components go here */}
    <AppRouter/>
  </>
  );
}

export default App;
