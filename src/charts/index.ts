import Xlsx from "xlsx-chart";
import { WorkItemObject } from "../common/interfaces/workitems.interface";

export class Reports {
  private instance: Xlsx;
  chartOptions: any;

  constructor(file: string) {
    this.instance = new Xlsx();
    this.chartOptions = {
      file,
      charts: [],
    };
  }

  assign(opts: any) {
    this.chartOptions = opts;
  }

  write() {
    this.instance.writeFile(this.chartOptions, (err: Error) => {
      console.log("File: ", this.chartOptions.file);
    });
  }
  createTypeReport(data: any[]) {
    let Bugs = 0;
    let Backlogs = 0;

    data.map((item) => {
      if (item.fields["System.WorkItemType"] === "Bug") Bugs++;
      if (item.fields["System.WorkItemType"] === "Product Backlog Item")
        Backlogs++;
    });
    const chart = {
      chart: "pie",
      chartTitle: "Total de itens por tipo",
      titles: ["Bugs", "Backlog Item"],
      fields: ["Total"],
      data: {
        Bugs: {
          Total: Bugs,
        },
        "Backlog Item": {
          Total: Backlogs,
        },
      },
    };
    this.chartOptions.charts.push(chart);
    console.log(this.chartOptions);
  }
}
