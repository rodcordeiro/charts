export interface WorkItemObject {
  id: number;
  rev: number;
  fields: Fields;
  _links: Links;
  url: string;
}

interface Links {
  self: Self;
  workItemUpdates: Self;
  workItemRevisions: Self;
  workItemComments: Self;
  html: Self;
  workItemType: Self;
  fields: Self;
}

interface Self {
  href: string;
}

interface Fields {
  "System.Id": number;
  "System.WorkItemType": string;
  "System.State": string;
  "System.AssignedTo": SystemAssignedTo;
  "System.Title": string;
  "Custom.ProjectName": string;
  "Custom.Client": string;
}

interface SystemAssignedTo {
  displayName: string;
  url: string;
  _links: Function[];
  id: string;
  uniqueName: string;
  imageUrl: string;
  descriptor: string;
}
