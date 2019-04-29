import { State } from "../state";

export function getLicenses(state: State) {
  return [
    {
      id: "xxxxxxxxxx",
      gauge: 12,
      unlimited: false,
      amount: 2000,
      purpose: "SHOOTING",
      startsAt: new Date(2018, 5, 15),
      expiredAt: new Date(2019, 5, 14)
    },
    {
      id: "yyyyyyyyyy",
      gauge: 12,
      unlimited: true,
      purpose: "HUNTING",
      startsAt: new Date(2019, 5, 14)
    }
  ];
}
