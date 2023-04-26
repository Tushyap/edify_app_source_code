import React, { Component } from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Payment from './pages/Payment';
import Header from './pages/components/Header';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LoginLogout from './pages/LoginLogout';



// function App() {\
class App extends Component{
  render(){
    return(
      <div className="App">
        <Header/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/about' element={<About/>}></Route>
          <Route exact path='/contact' element={<Contact/>}></Route>
          <Route exact path='/payment' element={<Payment/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/signup' element={<Signup/>}></Route>
          <Route exact path='/loginlogout' element={<LoginLogout/>}></Route>
        </Routes>
        
      </div>
    );
  }
}
export default App;
  
    

  
// export default App;
