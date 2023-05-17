import { getPersonalAccessTokenHandler, WebApi } from "azure-devops-node-api";
import { Batch } from '../common/Batch.util';

const authHandler = getPersonalAccessTokenHandler(
  "z4ctqvrblhqiyeangkkeend5odkvawd7a7gxtiayx6f5v43ykcnq"
);
export const client = new WebApi(
  "https://dev.azure.com/pdasolucoes",
  authHandler
);

export const getWorkItems = async () => {
  try {
    const wiClient = await client.getWorkItemTrackingApi();
    console.debug("azure::wiClient instantiated");
    const queryResult = await wiClient.queryById(
      "09864a47-8651-4e10-9513-5a06f144c716"
    );
    console.debug("azure::query result getted");
    const batch = new Batch(queryResult.workItems!);
    let workitems:any = [];
    
   await batch.batchProcess(async data => {
      const items = await Promise.all(data.map((workitem: any) => wiClient
        .getWorkItem(Number(workitem.id), [
          "System.Id",
          "System.WorkItemType",
          "System.Title",
          "Custom.Client",
          "Custom.Project",
          "Custom.ProjectName",
          "System.AssignedTo",
          "System.State",
        ])))
      workitems.push(items)
    })
    console.log(workitems.flat(Infinity)[0]);
    return "workItems";
  } catch (err) {
    throw err;
  }
};
