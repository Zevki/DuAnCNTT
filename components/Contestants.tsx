import { castVote } from '@/services/blockchain'
import { truncate } from '@/utils/helper'
import { ContestantStruct, PollStruct, RootState } from '@/utils/types'
import Image from 'next/image'
import React from 'react'
import { BiUpvote } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Contestants: React.FC<{ contestants: ContestantStruct[]; poll: PollStruct }> = ({
  contestants,
  poll,
}) => {
  return (
    <div className="space-y-2">
      {/* <h1 className="text-center text-[48px] font-[600px]">Contestants</h1> */}

      <div className="grid grid-cols-1 xl:grid-cols-1 pb-7 gap-[62px] sm:w-2/3 xl:w-11/12 mx-auto">
        {contestants.map((contestant, i) => (
          <Contestant poll={poll} contestant={contestant} key={i} />
        ))}
      </div>
    </div>
  )
}

const Contestant: React.FC<{ contestant: ContestantStruct; poll: PollStruct }> = ({
  contestant,
  poll,
}) => {
  const { wallet } = useSelector((states: RootState) => states.globalStates)

  const voteContestant = async () => {
    await toast.promise(
      new Promise<void>((resolve, reject) => {
        castVote(poll.id, contestant.id)
          .then((tx) => {
            console.log(tx)
            resolve(tx)
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Processing',
        success: 'Voted successfully',
        error: 'Voting error',
      }
    )
  }

  // Convert newlines in the achievement text to HTML <br> elements
  const formattedAchievement = contestant.achievement.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ))

  return (
    <div className="flex justify-start items-center space-x-2 md:space-x-8 mt-20 md:mx-auto">
      <div className="w-[187px] sm:w-[400px] h-[229px] sm:h-[350px] rounded-[24px] overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          width={3500}
          height={500}
          src={contestant.picture}
          alt={contestant.contestantName}
        />
      </div>

      <div
        className="w-full h-[257px] gap-[1px] rounded-[24px] sm:h-fit space-y-5 
        flex justify-center items-center flex-col pt-2 pb-2 px-3
        md:w-[600px] bg-[#151515] px-[15px] py-[18px] md:px-[22px]"
      >
        <h1 className="text-[24px] sm:text-[40px] font-[600px] mb-0 font-bold">
          {contestant.contestantName}
        </h1>

        <div className="flex items-center justify-center rounded-[20px] space-x-2 
        bg-[#3C5B6F] rounded-full py-[4px] px-[12px]">
          <p className="text-[20px] font-[500px]">
            {truncate({ text: contestant.participant, startChars: 4, endChars: 4, maxLength: 11 })}
          </p>
        </div>

        <hr className="w-full sm:w-[450px] border-t-4 border-gray-400 mt-3" />

        {/* Achievement with line breaks */}
        <p className="text-[20px] font-[500px] text-center">{formattedAchievement}</p>

        <button
          onClick={voteContestant}
          disabled={
            wallet
              ? poll.voters.includes(wallet) ||
                Date.now() < poll.startTime ||
                Date.now() >= poll.endTime
              : true
          }
          className={`font-bold w-[158px] sm:w-[213px] h-[48px] rounded-[30.5px] ${
            (wallet && poll.voters.includes(wallet)) ||
            Date.now() < poll.startTime ||
            Date.now() >= poll.endTime
              ? 'bg-[#B0BAC9] cursor-not-allowed'
              : 'bg-[#1B5CFE]'
          }`}
        >
          {wallet && contestant.voters.includes(wallet) ? 'Voted' : 'Vote'}
        </button>

        <div className="w-[90px] h-[32px] flex items-center justify-center gap-3">
          <div className="w-[32px] h-[32px] rounded-[9px] py-[8px] px-[9px] bg-[#0E1933]">
            <BiUpvote size={20} className="text-[#1B5CFE]" />
          </div>
          <p className="text-[14px] font-[600px]">{contestant.voteCount} votes</p>
        </div>
      </div>
    </div>
  )
}

export default Contestants
