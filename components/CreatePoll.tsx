import { createPoll } from '@/services/blockchain'
import { globalActions } from '@/store/globalSlices'
import { PollParams, RootState } from '@/utils/types'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const CreatePoll: React.FC = () => {
  const { createModal } = useSelector((states: RootState) => states.globalStates)
  const dispatch = useDispatch()
  const { setCreateModal } = globalActions

  const [poll, setPoll] = useState<PollParams>({
    name: '',
    info: '',
    startTime: '',
    endTime: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!poll.name || !poll.info || !poll.startTime || !poll.endTime) return

    poll.startTime = new Date(poll.startTime).getTime()
    poll.endTime = new Date(poll.endTime).getTime()

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        createPoll(poll)
          .then((tx) => {
            closeModal()
            console.log(tx)
            resolve(tx)
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Processing',
        success: 'Poll created successfully',
        error: 'Error creating poll',
      }
    )
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPoll((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const closeModal = () => {
    dispatch(setCreateModal('scale-0'))
    setPoll({
      name: '',
      info: '',
      startTime: '',
      endTime: '',
    })
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${createModal}`}
    >
      <div className="bg-[#BBBBBB] text-[#0c0c10] shadow-lg shadow-[#1B5CFE] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Add Poll</p>
            <button onClick={closeModal} className="border-0 bg-transparent focus:outline-none">
              <FaTimes />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-start rounded-xl mt-5 mb-5"
          >
            <div className="py-4 w-full border border-[#212D4A] rounded-full flex items-center px-4 mb-3 mt-2">
              <input
                placeholder="Poll name"
                className="bg-transparent outline-none w-full placeholder-[#929292] text-sm"
                name="name"
                value={poll.name}
                onChange={handleChange}
                required
              />
            </div>

            <div
              className="py-4 w-full border border-[#212D4A] rounded-full
              flex items-center px-4 mb-3 mt-2 space-x-2 relative"
            >
              <span
                className="bg-[#1B5CFE] bg-opacity-20 text-[#4C6AD7]
                absolute left-[2.5px] py-3 rounded-full px-5 w-48"
              >
                <span className="text-transparent">.</span>
              </span>
              <input
                className="bg-transparent outline-none w-full placeholder-transparent text-sm"
                name="startTime"
                type="datetime-local"
                placeholder="Start Date"
                value={poll.startTime}
                onChange={handleChange}
                required
              />
            </div>

            <div
              className="py-4 w-full border border-[#212D4A] rounded-full
              flex items-center px-4 mb-3 mt-2 space-x-2 relative"
            >
              <span
                className="bg-[#1B5CFE] bg-opacity-20 text-[#4C6AD7]
                absolute left-[2.5px] py-3 rounded-full px-5 w-48"
              >
                <span className="text-transparent">.</span>
              </span>
              <input
                className="bg-transparent outline-none w-full placeholder-[#929292] text-sm"
                name="endTime"
                type="datetime-local"
                value={poll.endTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="py-4 w-full border border-[#212D4A] rounded-xl flex items-center px-4 h-20 mt-2">
              <textarea
                placeholder="Poll info"
                className="bg-transparent outline-none w-full placeholder-[#929292] text-sm"
                name="info"
                value={poll.info}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="h-[48px] w-full block mt-10 px-3 rounded-full text-sm font-bold
              transition-all duration-300 bg-[#1B5CFE] text-[#BBBBBB] hover:bg-blue-500"
            >
              Create Poll
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePoll
