import Xlsx from "xlsx-chart";
import spinner from "../common/loader";
import { Batch } from "../common/Batch.util";

export class Reports {
  private instance: Xlsx;
  chartOptions: any;
  batch: Batch<any>;

  constructor(file: string, items: any[]) {
    this.instance = new Xlsx();
    this.chartOptions = {
      file,
      charts: [],
    };
    this.batch = new Batch(items);
  }

  assign(opts: any) {
    this.chartOptions = opts;
  }

  write() {
    spinner.text = "chats::creating file";
    this.instance.writeFile(this.chartOptions, (err: Error) => {
      if (err) {
        return spinner.fail(err.message);
      }
      spinner.succeed("File: " + this.chartOptions.file);
    });
  }
  createTypeReport() {
    spinner.text = "chats::creating type report";
    let Bugs = 0;
    let Backlogs = 0;
    this.batch.process(async (item) => {
      if (item.fields["System.WorkItemType"] === "Bug") Bugs++;
      if (item.fields["System.WorkItemType"] === "Product Backlog Item")
        Backlogs++;
    });

    const chart = {
      chart: "column",
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
  }
  createClientReport(client: string) {
    spinner.text = "chats::creating client report";
    const workitemtypes: { [k: string]: number } = {};
    this.batch.process(
      async (item) => {
        if (workitemtypes[item.fields["System.WorkItemType"]]) {
          workitemtypes[item.fields["System.WorkItemType"]]++;
        } else {
          workitemtypes[item.fields["System.WorkItemType"]] = 1;
        }
      },
      (data) =>
        String(data.fields["Custom.client"])
          .toLowerCase()
          .includes(client.toLowerCase()) ||
        String(data.fields["System.Title"])
          .toLowerCase()
          .includes(client.toLowerCase())
    );
    const chart = {
      chart: "column",
      chartTitle: "Itens por tipo",
      titles: ["Tipos"],
      fields: ["Product Backlog Item", "Bug", "Task"],
      data: {
        Tipos: workitemtypes,
      },
    };
    this.chartOptions.charts.push(chart);
  }
}
