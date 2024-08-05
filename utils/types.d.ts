export interface TruncateParams {
  text: string
  startChars: number
  endChars: number
  maxLength: number
}

export interface PollParams {
  name: string
  info: string
  startTime: number | string
  endTime: number | string
}

export interface PollStruct {
  id: number
  name: string
  info: string
  voteCount: number
  contestantCount: number
  isDeleted: boolean
  creator: string
  startTime: number
  endTime: number
  createdTime: number
  images: string[]
  voters: string[]
}

export interface ContestantStruct {
  id: number
  picture: string
  contestantName: string
  achievement: string
  participant: string
  voteCount: number
  voters: string[]
}

export interface GlobalState {
  wallet: string
  createModal: string
  modifyModal: string
  removeModal: string
  addParticipantModal: string
  polls: PollStruct[]
  poll: PollStruct | null
  contestants: ContestantStruct[]
}

export interface RootState {
  globalStates: GlobalState
}
