import { globalActions } from '@/store/globalSlices'
import React from 'react'
import { useDispatch } from 'react-redux'

const Banner = () => {
  const dispacth = useDispatch()
  const { setCreateModal } = globalActions
  return (
    <main className="mx-auto text-center space-y-8">
      <h1 className="text-[70px] font-[600px] text-center leading-none text-black font-bold mb-20" 
        style={{
          textShadow: '0 0 3px #fff, 0 0 5px #fff, 0 0 7px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff, 0 0 25px #fff'
        }}>Decentralized E-Voting System</h1>

        <hr className="w-full sm:w-[450px] border-2 border-gray-600 mx-auto" />
      <button
        className="fixed bottom-10 right-9 text-black h-[80px] w-[80px] rounded-full
        border-2 border-gray-800 hover:text-gray-800 font-bold
        bg-gradient-to-r from-[#BBE9FF] to-[#088395] flex items-center justify-center"
        
        onClick={() => dispacth(setCreateModal('scale-100'))}
      >
        New Poll
      </button>
    </main>
  )
}



export default Banner
