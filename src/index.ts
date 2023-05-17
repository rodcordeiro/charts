import { Reports } from "./charts";
import { getWorkItems } from "./azure";
import spinner from "./common/loader";

const data = async () => await getWorkItems();
const charts = new Reports(`${new Date().toISOString()}.xlsx`);
spinner.start("bot::starting report");
(async () => {
  const workitems = await data();
  spinner.info();
  charts.createTypeReport(workitems);
  charts.write();
  //   console.log(workitems[0]);
})();

// const opts = {
//   file: "charts.xlsx", // new Date().toISOString(),
//   chart: "column",
//   titles: ["Title 1", "Title 2", "Title 3"],
//   fields: ["Field 1", "Field 2", "Field 3", "Field 4"],
//   data: {
//     "Title 1": {
//       "Field 1": 5,
//       "Field 2": 10,
//       "Field 3": 15,
//       "Field 4": 20,
//     },
//     "Title 2": {
//       "Field 1": 10,
//       "Field 2": 5,
//       "Field 3": 20,
//       "Field 4": 15,
//     },
//     "Title 3": {
//       "Field 1": 20,
//       "Field 2": 15,
//       "Field 3": 10,
//       "Field 4": 5,
//     },
//   },
// };

// charts.assign(opts);
// charts.write();
