import { Journal } from "../../../models/Journal"
import {
  SET_JOURNAL,
  REMOVE_JOURNAL,
  FETCH_JOURNALS_STARTED,
  FETCH_JOURNALS_SUCCEED,
  FETCH_JOURNALS_FAILED,
} from "./types"

export const addJournal = (journal: Journal) => ({
  type: SET_JOURNAL,
  journal,
})

export const removeJournal = (id: string) => ({
  type: REMOVE_JOURNAL,
  id,
})

export const fetchJournalsStart = () => ({
  type: FETCH_JOURNALS_STARTED,
})
export const fetchJournalsSuccess = (journals: Record<string, Journal>) => ({
  type: FETCH_JOURNALS_SUCCEED,
  journals,
})
export const fetchJournalsFailed = (error: Error) => ({
  type: FETCH_JOURNALS_FAILED,
  error,
})

export type Action =
  | ReturnType<typeof addJournal>
  | ReturnType<typeof removeJournal>
  | ReturnType<typeof fetchJournalsStart>
  | ReturnType<typeof fetchJournalsSuccess>
  | ReturnType<typeof fetchJournalsFailed>
