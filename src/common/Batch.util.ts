export class Batch<T = unknown>{
  public data: T[] = [];

  constructor(data: T[]) {
    this.data = data;
  }
  private createBatch(batchLength:number) {
    const batch: [T[]] = [] as unknown as [T[]];
    let arr: T[] = []
    this.data.map((item, index) => {
      if (arr.length === batchLength) {
        batch.push(arr)
        arr = [item]
        return
      }
      if (index === this.data.length - 1) {
        arr.push(item)
        batch.push(arr)
        return
      }
      arr.push(item)
      return
    })
    return batch
  }

  async batchProcess(cb: (batch: T[]) => Promise<void>,batchLength = 10) {
    const batchData = this.createBatch(batchLength)
    for await (const batch of batchData) {
      await cb(batch)
    }
  }
  async process(cb: (data: T) => Promise<void>) {
    for await (const data of this.data) {
      await cb(data)
    }
  }

}