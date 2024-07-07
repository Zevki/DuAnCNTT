import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Details from '@/components/Details'
import Head from 'next/head'
import { ContestantStruct, PollStruct, RootState } from '@/utils/types'
import ModifyPoll from '@/components/ModifyPoll'
import RemovePoll from '@/components/RemovePoll'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/globalSlices'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Polls({
  pollData,
  contestantsData,
}: {
  pollData: PollStruct
  contestantsData: ContestantStruct[]
}) {
  const dispatch = useDispatch()
  const { setPoll, setContestants } = globalActions
  const { poll, contestants } = useSelector((states: RootState) => states.globalStates)

  useEffect(() => {
    dispatch(setPoll(pollData))
    dispatch(setContestants(contestantsData))
  }, [dispatch, setPoll, pollData, setContestants, contestantsData])
  return (
    <>
      {poll && (
        <Head>
          <title>Poll | {poll.name}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}

      <div className="min-h-screen relative backdrop-blur">
        <div
          className="absolute inset-0 before:absolute before:inset-0
          before:w-full before:h-full before:bg-[url('/assets/images/bg.jpeg')]
          before:blur-sm before:z-[-1] before:bg-no-repeat before:bg-cover"
        />

        <section className="relative px-5 py-10 space-y-16 text-white sm:p-10">
          <Navbar />
          {poll && <Details poll={poll} />}
          <Footer />
        </section>
        
        {poll && <RemovePoll poll={poll} />}
        {poll && <ModifyPoll pollData={poll} />}
      </div>
    </>
  )
}
