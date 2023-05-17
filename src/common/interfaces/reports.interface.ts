export interface ReportObject {
  file: string;
  charts: {
    chart: string;
    chartTitle: string;
    titles: Array<string>;
    fields: string[];
    data: Reports;
  }[];
}

interface Reports {
  Bugs: Title1;
  "Backlog Items": Title1;
}

interface Title1 {
  Total: number;
}
