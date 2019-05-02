import * as React from "react";
import { render } from "react-dom";
import { Report } from "../components/pages/Report";
import "../../public/print.css";

render(
  <Report
    journals={[
      {
        licenseId: "xxx",
        kind: "receive",
        transferrer: "直井銃砲店",
        id: "bbb",
        date: new Date(2018, 9, 14),
        userId: "XXX",
        createdAt: new Date(),
        amount: 150
      },
      {
        licenseId: "xxx",
        kind: "consume",
        place: "金谷国際射撃場",
        id: "aaa",
        date: new Date(2018, 9, 14),
        userId: "XXX",
        createdAt: new Date(),
        amount: 150
      }
    ]}
    licenses={{
      xxx: {
        kind: "limited",
        id: "xxx",
        purpose: "SHOOTING",
        gauge: 12,
        amount: 2000,
        createdAt: new Date(),
        startsAt: new Date(2018, 4, 15),
        expiredAt: new Date(2019, 4, 14)
      }
    }}
  />,
  document.getElementById("root")
);
