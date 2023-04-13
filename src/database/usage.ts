import { cosmosClient, databaseName, usageDataContainerName } from "./database";

const uploadUsageData = async (
  actionType: string,
  userID: string,
  questionID: string,
  timeUsed: number,
  code?: string
) => {
  var d = new Date();
  const data: UsageData = {
    action: actionType,
    userID: userID,
    questionID: questionID,
    timestamp: d.toLocaleString(),
    code: code,
    timeUsed: timeUsed,
  };

  const database = await cosmosClient.database(databaseName);
  const container = await database.container(usageDataContainerName);
  const { resource } = await container.items.create(data);
  return resource;
};

export { uploadUsageData };
