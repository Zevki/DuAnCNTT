/* eslint-disable @next/next/no-img-element */
import { formatDate, truncate } from '@/utils/helper'
import { PollStruct } from '@/utils/types'
import { useRouter } from 'next/router'
import React from 'react'

const Polls: React.FC<{ polls: PollStruct[] }> = ({ polls }) => {
  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 pb-7 gap-[62px] sm:w-2/3 xl:w-5/6 mx-auto">
        {polls.map((poll, i) => (
          <Poll key={i} poll={poll} />
        ))}
      </div>
    </div>
  )
}
const Poll: React.FC<{ poll: PollStruct }> = ({ poll }) => {
  const navigate = useRouter()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mx-auto w-full">
      <div
        className="h-[392px] gap-[10px] md:w-[580px] md:h-[280px]
            grid grid-cols-1 md:flex justify-start w-full">
        <div
          className="w-full h-[257px] gap-[14px] rounded-[24px] space-y-5
                md:w-[560px] md:h-[300px] bg-[#322C2B] px-[15px] py-[18px] md:px-[22px]">

            {/* Title */}
            <h1 className="text-[25px] font-[600px]">
            <span className="font-bold">Title: </span>
              {truncate({ text: poll.name, startChars: 35, endChars: 0, maxLength: 38 })}
            </h1>

            {/* Description */}
            <p className="text-[16px] font-[400px]">
            <span className="font-bold">Description: </span>
              {truncate({ text: poll.info, startChars: 110, endChars: 0, maxLength: 113 })}
            </p>

            {/* Date */}
            <div className="flex justify-between items-center gap-[8px]">
              <div
                className="h-[28px] bg-[#3C5B6F] rounded-full py-[4px] px-[12px]
                  text-[14px] font-[400px]"
              >
                {formatDate(poll.startTime)}
              </div>

              {/* Address */}
              <div className="h-[50px] flex items-center">
                <div
                  className="h-[28px] bg-[#3C5B6F] rounded-full py-[4px] px-[12px]
                    text-[14px] font-[400px]">

                  {truncate({ text: poll.creator, startChars: 4, endChars: 4, maxLength: 11 })}
                </div>
              </div>
          </div>
          
          <button
            onClick={() => navigate.push('/polls/' + poll.id)}
            className="h-[44px] w-full rounded-full transition-all duration-300 bg-[#1B5CFE] hover:bg-blue-500">
            Enter
          </button>
        </div>
      </div>
    </div>
  )
}

export default Polls

