import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Details from '@/components/Details'
import Contestants from '@/components/Contestants'
import Head from 'next/head'
import AddParticipant from '@/components/AddParticipant'
import { GetServerSidePropsContext } from 'next'
import { ContestantStruct, PollStruct, RootState } from '@/utils/types'
import ModifyPoll from '@/components/ModifyPoll'
import RemovePoll from '@/components/RemovePoll'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/globalSlices'
import { useEffect } from 'react'
import { listContestants, getPollDetails } from '@/services/blockchain'

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
          className="absolute inset-0 before:absolute
          before:w-full before:h-full before:bg-[#1E0342]"
        />

        <section className="relative px-5 py-10 space-y-16 text-white sm:p-10">
          <Navbar />
          {poll && <Details poll={poll} />}
          {poll && contestants && <Contestants poll={poll} contestants={contestants} />}
          <Footer />
        </section>

        {poll && <AddParticipant poll={poll} />}
        {poll && <RemovePoll poll={poll} />}
        {poll && <ModifyPoll pollData={poll} />}
      </div>
    </>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query
  const pollData = await getPollDetails(Number(id))
  const contestantData = await listContestants(Number(id))

  return {
    props: {
      pollData: JSON.parse(JSON.stringify(pollData)),
      contestantsData: JSON.parse(JSON.stringify(contestantData)),
    },
  }
}

