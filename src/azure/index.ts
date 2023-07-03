import { getPersonalAccessTokenHandler, WebApi } from "azure-devops-node-api";
import { WorkItem } from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import { Batch } from "../common/Batch.util";
import spinner from "../common/loader";

const authHandler = getPersonalAccessTokenHandler(
  "qjv27iqppskcq7gkyvwnqto3k4lrusihvyu7tdf6axtodh3hppka"
);
export const client = new WebApi(
  "https://dev.azure.com/pdasolucoes",
  authHandler
);

export const getWorkItems = async () => {
  try {
    const wiClient = await client.getWorkItemTrackingApi();
    spinner.text = "azure::wiClient instantiated";
    // console.debug("azure::wiClient instantiated");
    const queryResult = await wiClient.queryById(
      "09864a47-8651-4e10-9513-5a06f144c716"
    );
    spinner.text =
      "azure::work items retrieved successfully. Processing data...";
    // console.debug("azure::query result getted");
    const batch = new Batch(queryResult.workItems!);
    let workitems: WorkItem[] = [];

    await batch.batchProcess(async (data) => {
      const items = await Promise.all(
        data.map((workitem: any) =>
          wiClient.getWorkItem(Number(workitem.id), [
            "System.Id",
            "System.WorkItemType",
            "System.Title",
            "Custom.Client",
            "Custom.Project",
            "Custom.ProjectName",
            "System.AssignedTo",
            "System.State",
          ])
        )
      );
      items.map((item) => workitems.push(item));
    });
    spinner.text = "azure::workitems processed successfully!";
    return workitems;
  } catch (err) {
    throw err;
  }
};
