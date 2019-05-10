import React from "react";
import { Print } from "expo";
import { Share } from "react-native";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { Helmet } from "react-helmet";
import paperSize from "paper-size";
import { State } from "../redux/state";
import { renderToString } from "../lib/html";
import { Report } from "../components/pages/Report";
import { getLoggedInUser } from "../redux/selectors/getLoggedInUser";
import { getJournals } from "../redux/selectors/getJournals";
import { addExamine } from "../redux/store/examines/actions";

export const generateReport = ({
  remaining,
  startsAt,
  endsAt
}: {
  remaining: number;
  startsAt: Date;
  endsAt: Date;
}): ThunkAction<Promise<void>, State, {}, AnyAction> => async (
  dispatch,
  getState
) => {
  const user = getLoggedInUser(getState());
  if (!user) {
    return;
  }

  const { licenses } = getState().licenses;
  const journals = getJournals(getState());

  const journalsInRange = journals.filter(
    j =>
      startsAt.getTime() <= j.createdAt.getTime() &&
      j.createdAt.getTime() <= endsAt.getTime()
  ).sort((a, b) => a.date.getTime() - b.date.getTime());

  const dateFormatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const html = renderToString(
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/paper-css@0.4.1/paper.min.css"
        />
        <link
          rel="stylesheet"
          href="https://shellshot-journal.firebaseapp.com/print.css"
        />
        <title>
          {dateFormatter.format(startsAt)}-${dateFormatter.format(endsAt)}
          -実包等管理帳簿
        </title>
      </Helmet>
      <div className="sheet padding-20mm">
        <Report
          licenses={licenses}
          journals={journalsInRange}
          remaining={remaining}
          startsAt={startsAt}
        />
      </div>
    </>,
    Helmet
  );

  const [height, width] = paperSize.getSize("a4", {
    unit: "pixel",
    dpi: 144
  });
  const { uri } = await Print.printToFileAsync({
    html,
    width,
    height
  });

  const result = await Share.share({ url: uri });
  if (result.action === Share.dismissedAction) {
    return;
  }

  dispatch(addExamine({ examinedAt: endsAt }));
};
