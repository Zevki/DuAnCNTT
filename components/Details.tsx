import { globalActions } from '@/store/globalSlices'
import { formatDate, truncate } from '@/utils/helper'
import { PollStruct, RootState } from '@/utils/types'
import React from 'react'
import { MdModeEdit, MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

const Details: React.FC<{ poll: PollStruct }> = ({ poll }) => {
  const dispatch = useDispatch()
  const { setModifyModal, setRemoveModal, setAddParticipantModal } = globalActions
  const { wallet } = useSelector((states: RootState) => states.globalStates)

  return (
    <>
      <div
        className="flex flex-col items-center justify-center space-y-6
        mt-5 w-full md:max-w-[736px] mx-auto"
      >
        <h1 className="text-[47px] font-[600px] text-center leading-none">{poll.name}</h1>
        <p className="text-[16px] font-[500px] text-center">{poll.info}</p>

        <div className=" h-[136px] gap-[16px] flex flex-col items-center mt-4">
          <div
            className="h-[36px] py-[6px] px-[12px] rounded-full gap-[4px] border 
            border-gray-400 bg-white bg-opacity-20"
          >
            <p className="text-[14px] font-[500px] text-center md:text-[16px]">
              {formatDate(poll.startTime)} - {formatDate(poll.endTime)}
            </p>
          </div>

          <div
            className="flex items-center justify-center w-[133px] h-[32px]
                 py-[20px] rounded-[10px] gap-[12px]"
          >
            Creator:
            <p className="h-[35px] bg-[#3C5B6F] rounded-full py-[4px] px-[12px]
                    text-[18px] font-[400px]">
              {truncate({ text: poll.creator, startChars: 4, endChars: 4, maxLength: 11 })}
            </p>
          </div>

          <div className="h-[36px] gap-[4px] flex justify-center items-center">
            <button
              className="py-[6px] px-[12px] border border-gray-400 bg-white bg-opacity-20
              rounded-full text-[12px] md:text-[16px]"
            >
              {poll.voteCount} voteCount
            </button>

            <button
              className="py-[6px] px-[12px] 
              border border-gray-400 bg-white bg-opacity-20 rounded-full text-[12px] md:text-[16px]"
            >
              {poll.contestantCount} contestantCount
            </button>

            {wallet && wallet === poll.creator && poll.voteCount < 1 && (
              <button
                className="py-[6px] px-[12px] 
              border border-gray-400 bg-white bg-opacity-20 rounded-full 
              text-[12px] md:text-[16px] gap-[8px] flex justify-center items-center"
                onClick={() => dispatch(setModifyModal('scale-100'))}
              >
                <MdModeEdit size={20} className="text-[#1B5CFE]" />
                Modify poll
              </button>
            )}

            {wallet && wallet === poll.creator && poll.voteCount < 1 && (
              <button
                className="py-[6px] px-[12px] 
              border border-gray-400 bg-white bg-opacity-20 rounded-full 
              text-[12px] md:text-[16px] gap-[8px] flex justify-center items-center"
                onClick={() => dispatch(setRemoveModal('scale-100'))}
              >
                <MdDelete size={20} className="text-[#fe1b1b]" />
                Remove poll
              </button>
            )}
          </div>

          {poll.voteCount < 1 && (
            <button
              className="text-black h-[45px] w-[148px] rounded-full transition-all duration-300
              border border-gray-400 bg-white hover:bg-opacity-20 hover:text-white py-2"
              onClick={()=>dispatch(setAddParticipantModal('scale-100'))}
            >
              Contestant Register
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Details
