
import './App.css'

import Manager from './Components/Manager'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'


//For icons:        lordicon    -> For icons like google icons but animated
//For tailwind bg:  ibelick     -> For tailwind background 
function App() {
  

  return (
    <>
    <Navbar/>
    <div className="[background:radial-gradient(120%_125%_at_55%_10%,#010_50%,#63e_100%)]">

    <Manager/>
    </div>
    <Footer/>
  
    </>
  )
}

export default App
