import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { State } from "../redux/state";
import {
  fetchJournalsStart,
  fetchJournalsFailed,
  fetchJournalsSuccess
} from "../redux/store/journals/actions";

export const fetchJournals = (): ThunkAction<
  Promise<void>,
  State,
  {},
  AnyAction
> => async dispatch => {
  dispatch(fetchJournalsStart());
  try {
    const journals = await Promise.resolve({});
    dispatch(fetchJournalsSuccess(journals));
  } catch (e) {
    dispatch(fetchJournalsFailed(e));
  }
};
