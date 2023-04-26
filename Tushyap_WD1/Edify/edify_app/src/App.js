import React, { Component } from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './pages/components/Header';
import Navbar from './pages/components/Navbar';
import Signup from './pages/components/Signup';
import Signin from './pages/components/Signin';




// function App() {\
class App extends Component{
  render(){
    return(
      <div className="App">
        <Header/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/signin' element={<Signin/>}/>
        </Routes>
        
      </div>
    );
  }
}
export default App;
  
    

  
// export default App;
