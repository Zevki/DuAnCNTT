import { ethers } from 'ethers'
import address from '@/artifacts/contractAddress.json'
import abi from '@/artifacts/contracts/DappVotes.sol/DappVotes.json'
import { store } from '@/store'
import { globalActions } from '@/store/globalSlices'
import { ContestantStruct, PollParams, PollStruct } from '@/utils/types'
import { error } from 'console'

const { setWallet, setPolls, setPoll, setContestants } = globalActions
const ContractAddress = address.address
const ContractAbi = abi.abi
let ethereum: any
let tx: any

if (typeof window !== 'undefined') {
  ethereum = (window as any).ethereum
}

const connectWallet = async () => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const accounts = await ethereum.request?.({ method: 'eth_requestAccounts' })
    store.dispatch(setWallet(accounts?.[0]))
  } catch (error) {
    reportError(error)
  }
}

const checkWallet = async () => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const accounts = await ethereum.request?.({ method: 'eth_accounts' })

    ethereum.on('chainChanged', () => {
      window.location.reload()
    })

    ethereum.on('accountsChanged', async () => {
      store.dispatch(setWallet(accounts?.[0]))
      await checkWallet()
    })

    if (accounts?.length) {
      store.dispatch(setWallet(accounts[0]))
    } else {
      store.dispatch(setWallet(''))
      reportError('Please connect wallet, no accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}

const getEthereumContract = async () => {
  const accounts = await ethereum?.request?.({ method: 'eth_accounts' })
  const provider = accounts?.[0]
    ? new ethers.providers.Web3Provider(ethereum)
    : new ethers.providers.JsonRpcProvider(process.env.NEXT_APP_RPC_URL)

  const wallet = accounts?.[0] ? null : ethers.Wallet.createRandom()
  const signer = provider.getSigner(accounts?.[0] ? undefined : wallet?.address)

  const contract = new ethers.Contract(ContractAddress, ContractAbi, signer)
  return contract
}

const createPoll = async (data: PollParams) => {
  if (!ethereum) {
    reportError('Please install Metamask')
    return Promise.reject(new Error('Metamask not installed'))
  }

  try {
    const contract = await getEthereumContract()
    const { name, info, startTime, endTime } = data
    const tx = await contract.createPoll(name, info, startTime, endTime)

    await tx.wait()
    const polls = await listPolls()
    store.dispatch(setPolls(polls))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const modifyPoll = async (id: number, data: PollParams) => {
  if (!ethereum) {
    reportError('Please install Metamask')
    return Promise.reject(new Error('Metamask not installed'))
  }

  try {
    const contract = await getEthereumContract()
    const { name, info, startTime, endTime } = data
    const tx = await contract.modifyPoll(id, name, info, startTime, endTime)

    await tx.wait()

    const poll = await getPollDetails(id)
    store.dispatch(setPoll(poll))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const removePoll = async (id: number) => {
  if (!ethereum) {
    reportError('Please install Metamask')
    return Promise.reject(new Error('Metamask not installed'))
  }

  try {
    const contract = await getEthereumContract()
    const tx = await contract.removePoll(id)

    await tx.wait()

    const poll = await getPollDetails(id)
    store.dispatch(setPoll(poll))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const listPolls = async (): Promise<PollStruct[]> => {
  const contract = await getEthereumContract()
  const polls = await contract.listPolls()
  return structurePolls(polls)
}

const getPollDetails = async (id: number): Promise<PollStruct> => {
  const contract = await getEthereumContract()
  const poll = await contract.getPollDetails(id)
  return structurePolls([poll])[0]
}

// eslint-disable-next-line max-params
const addContestant = async (id: number, name: string, image: string, achievement: string) => {
  if (!ethereum) {
    reportError('Please install Metamask')
    return Promise.reject(new Error('Metamask not installed'))
  }

  try {
    const contract = await getEthereumContract()
    const tx = await contract.addContestant(id, name, image, achievement)
    await tx.wait()

    const poll = await getPollDetails(id)
    store.dispatch(setPoll(poll))

    const contestants = await listContestants(id)
    store.dispatch(setContestants(contestants))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const castVote = async (id: number, cid: number) => {
  if (!ethereum) {
    reportError('Please install Metamask')
    return Promise.reject(new Error('Metamask not installed'))
  }

  try {
    const contract = await getEthereumContract()
    const tx = await contract.castVote(id, cid)
    await tx.wait()

    const poll = await getPollDetails(id)
    store.dispatch(setPoll(poll))

    const contestants = await listContestants(id)
    store.dispatch(setContestants(contestants))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const listContestants = async (id: number): Promise<ContestantStruct[]> => {
  const contract = await getEthereumContract()
  const contestants = await contract.listContestants(id)
  return structureContestants(contestants)
}

const structureContestants = (contestants: ContestantStruct[]): ContestantStruct[] =>
  contestants
    .map((contestant) => ({
      id: Number(contestant.id),
      picture: contestant.picture,
      contestantName: contestant.contestantName,
      achievement: contestant.achievement,
      participant: contestant.participant.toLowerCase(),
      voteCount: Number(contestant.voteCount),
      voters: contestant.voters.map((voter: string) => voter.toLowerCase()),
    }))
    .sort((a, b) => b.voteCount - a.voteCount)

const structurePolls = (polls: PollStruct[]): PollStruct[] =>
  polls
    .map((poll) => ({
      id: Number(poll.id),
      name: poll.name,
      info: poll.info,
      voteCount: Number(poll.voteCount),
      contestantCount: Number(poll.contestantCount),
      isDeleted: poll.isDeleted,
      creator: poll.creator.toLowerCase(),
      startTime: Number(poll.startTime),
      endTime: Number(poll.endTime),
      createdTime: Number(poll.createdTime),
      voters: poll.voters.map((voter: string) => voter.toLowerCase()),
      images: poll.images,
    }))
    .sort((a, b) => b.createdTime - a.createdTime)

const reportError = (error: any) => {
  console.log(error)
}

export {
  connectWallet,
  checkWallet,
  createPoll,
  listPolls,
  getPollDetails,
  modifyPoll,
  removePoll,
  addContestant,
  listContestants,
  castVote,
}
