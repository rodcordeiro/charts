import spinner from "../common/loader";
export class Batch<T = unknown> {
  public data: T[] = [];

  constructor(data: T[]) {
    this.data = data;
  }
  private createBatch(batchLength: number) {
    const batch: [T[]] = [] as unknown as [T[]];
    let arr: T[] = [];
    this.data.map((item, index) => {
      if (arr.length === batchLength) {
        batch.push(arr);
        arr = [item];
        return;
      }
      if (index === this.data.length - 1) {
        arr.push(item);
        batch.push(arr);
        return;
      }
      arr.push(item);
      return;
    });
    return batch;
  }

  async batchProcess(cb: (batch: T[]) => Promise<void>, batchLength = 10) {
    const batchData = this.createBatch(batchLength);
    let i = 1;
    for await (const batch of batchData) {
      spinner.text = `batch::processing ${Math.round(
        (i / batchData.length) * 100
      )}%`;
      await cb(batch);
      i++;
    }
  }
  async process(
    cb: (data: T) => Promise<void>,
    filter?: (data: T, index?: number, array?: Array<T>) => boolean
  ) {
    let i = 1;
    let data = this.data;
    if (filter) {
      data = data.filter((item, index) => filter(item, index, data));
    }
    for await (const item of data) {
      spinner.text = `batch::processing ${Math.round(
        (i / this.data.length) * 100
      )}%`;
      await cb(item);
      i++;
    }
  }
}
