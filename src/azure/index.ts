import { getPersonalAccessTokenHandler, WebApi } from "azure-devops-node-api";
import stream from "stream";

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
    
    // let lastItem = queryResult.workItems![queryResult.workItems!.length - 1].id;
    // wiClient
    //     .getWorkItem(Number(queryResult.workItems![index].id), [
    //       "System.Id",
    //       "System.WorkItemType",
    //       "System.Title",
    //       "Custom.Client",
    //       "Custom.Project",
    //       "Custom.ProjectName",
    //       "System.AssignedTo",
    //       "System.State",
    //     ])
    

    console.log(workItems);
    // queryResult.workItems?.map((wi) => console.log(Number(wi.id)));
    // const workItems = await Promise.all(
    //   queryResult.workItems!.map(async (workItem) => {
    //     console.debug(`azure::Processing workItem ${workItem.id}`);
    //     return wiClient.getWorkItem(Number(workItem.id), [
    //       "System.Id",
    //       "System.WorkItemType",
    //       "System.Title",
    //       "Custom.Client",
    //       "Custom.Project",
    //       "Custom.ProjectName",
    //       "System.AssignedTo",
    //       "System.State",
    //     ]);
    //   })
    // ).then((items) => {
    //   console.debug("azure::work items ");
    //   return items.map((item) => {
    //     console.log(item);
    //     return item;
    //   });
    // });
    return "workItems";
  } catch (err) {
    throw err;
  }
};
