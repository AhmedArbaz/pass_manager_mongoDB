// import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-green-200 '>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

        <div className='logo font-bold text-white text-2xl'>
            <span className="text-green-600">&lt;</span><span>Pass</span><span className="text-green-600">OP/&gt;</span> 
            
            </div>
        {/* <ul>
            <li className="flex gap-4 text-[18px]">
                <a className="hover:font-bold" href="#">Home</a>
                <a className="hover:font-bold" href="#">About</a>
                <a className="hover:font-bold" href="#">Contact</a>
                
            </li>
        </ul> */}
        <button className="text-white bg-green-500 my-5 rounded-full flex gap-2 p-1 justify-center items-center">
          <img className="invert w-10" src="/Icons/github.svg" alt="github" />
          <span className="font-bold">GitHub</span>
        </button>
        </div>
      
    </nav>
  )
}

export default Navbar
