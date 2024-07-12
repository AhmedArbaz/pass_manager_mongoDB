// import React from 'react'

const Footer = () => {
  return (
    <div className="bg-green-300 flex flex-col justify-center items-center text-green-800 font-bold  w-full">    
        <div className='logo font-bold text-white text-2xl'>
            <span className="text-green-700">&lt;</span><span>Pass</span><span className="text-green-700">OP/&gt;</span> 
            
            </div>
      <div className="flex justify-center items-center">
        Created For Your Security because its all <img className="w-6 mx-2 " src="/Icons/heart.png" alt="heart" /> that we reach here
      </div>
    </div>
  )
}

export default Footer
