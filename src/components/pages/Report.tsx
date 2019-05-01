import * as React from "react";
import { Journal } from "../../models/Journal";
import { License, getPurposeName } from "../../models/License";

type Props = {
  journals: Journal[];
  licenses: Record<string, License>;
};

const schema = {
  heads: [
    [
      { title: "年月日", className: "", rowSpan: 3 },
      { title: "目的", className: "", rowSpan: 3 },
      { title: "場所・譲渡人", className: "", rowSpan: 3 },
      { title: "実包", className: "", colSpan: 6 },
      { title: "空砲", className: "", rowSpan: 2, colSpan: 2 },
      { title: "実包・空砲\n合計", className: "", rowSpan: 3 },
      { title: "銃用雷管", className: "", rowSpan: 2, colSpan: 3 },
      { title: "火薬（グラム）", className: "", rowSpan: 2, colSpan: 3 }
    ],
    [
      { title: "ライフル銃以外の猟銃", className: "", colSpan: 3 },
      { title: "ライフル", className: "", colSpan: 3 }
    ],
    [
      { title: "番径", className: "" },
      { title: "受", className: "" },
      { title: "払", className: "" },
      { title: "種別", className: "" },
      { title: "受", className: "" },
      { title: "払", className: "" },
      { title: "受", className: "" },
      { title: "払", className: "" },
      { title: "受", className: "" },
      { title: "払", className: "" },
      { title: "残", className: "" },
      { title: "受", className: "" },
      { title: "払", className: "" },
      { title: "残", className: "" }
    ]
  ]
};

export function Report(props: Props) {
  const { journals, licenses } = props;

  const dateFormatter = new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
    era: "narrow"
  });

  return (
    <>
      <h1>実包（火薬類）等の保管管理簿</h1>
      <table border={1} cellSpacing={0} cellPadding={0}>
        <thead>
          {schema.heads.map((cells, i) => (
            <tr key={i}>
              {cells.map(({ title, ...attrs }, j) => (
                <th key={j} {...attrs}>
                  {title}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {journals.map(journal => {
            const license = licenses[journal.licenseId];
            if (!license) {
              throw new Error("License not found");
            }
            return (
              <tr key={journal.id}>
                <td>{dateFormatter.format(journal.date)}</td>
                <td>{getPurposeName(license.purpose)}</td>
                <td>
                  {journal.kind === "consume"
                    ? journal.place
                    : journal.transferrer}
                </td>
                <td>{license.gauge}</td>
                <td>{journal.kind === "receive" ? journal.amount : null}</td>
                <td>{journal.kind === "consume" ? journal.amount : null}</td>
                {/* ライフル未対応 */}
                <td>-</td>
                <td>-</td>
                <td>-</td>
                {/* 空砲未対応 */}
                <td>-</td>
                <td>-</td>
                <td>{journal.amount}</td>
                {/* 雷管未対応 */}
                <td>-</td>
                <td>-</td>
                <td>-</td>
                {/* 火薬未対応 */}
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
