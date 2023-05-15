import Xlsx from "xlsx-chart";

export class Reports {
  private instance: Xlsx;

  chartOptions: any;
  constructor() {
    this.instance = new Xlsx();
  }

  assign(opts: any) {
    this.chartOptions = opts;
  }

  write() {
    this.instance.writeFile(this.chartOptions, (err: Error) => {
      console.log("File: ", this.chartOptions.file);
    });
  }
}
