import { connectWallet } from '@/services/blockchain'
import { truncate } from '@/utils/helper'
import { RootState } from '@/utils/types'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { wallet } = useSelector((states: RootState) => states.globalStates)

  return (
    <nav
      className="h-[10px] flex justify-between items-center"
    >
      <Link href="/"  
      className="text-[20px] sm:text-[24px] text-black font-bold hover:text-gray-600" 
      style={{
          textShadow: '0 0 3px #fff, 0 0 5px #fff, 0 0 7px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff, 0 0 25px #fff'
        }}>
        Dapp E-Voting
      </Link>
      {wallet ? (
        <button
          className="h-[60px] w-[130px] 
          sm:w-[200px] px-3 rounded-full text-5px font-bold bg-gradient-to-r from-[#071952] to-[#088395] hover:brightness-110"
        >
          <span className="font-normal">Address: </span>
          {truncate({ text: wallet, startChars: 4, endChars: 4, maxLength: 11 })}
        </button>
      ) : (
        <button
          className="h-[48px] w-[280px] 
          sm:w-[200px] px-3 rounded-full text-5px font-bold
          bg-gradient-to-r from-[#071952] to-[#088395] hover:brightness-110"
          onClick={connectWallet}
        >
          Connect MetaMask
        </button>
      )}
    </nav>
  )
}

export default Navbar
