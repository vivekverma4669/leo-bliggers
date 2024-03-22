import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import AllRoutes from './Components/AllRoutes';
import { AuthProvider } from './Components/AuthContext';
import Navbar from './Components/Nav';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
    <AuthProvider>
    <div className="App">

   <Navbar/> 
     <AllRoutes/>      
    <Footer/>

    </div>
    </AuthProvider>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
{/* home , login , sign up   done   */}