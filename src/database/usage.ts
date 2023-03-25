import { cosmosClient, databaseName, usageDataContainerName } from "./database";

const uploadUsageData = async (
  actionType: string,
  userID: string,
  questionID: string,
  code?: string
) => {
  var d = new Date();
  const data: UsageData = {
    type: actionType,
    userID: userID,
    questionID: questionID,
    timestamp: d.toLocaleString(),
    code: code,
  };

  const database = await cosmosClient.database(databaseName);
  const container = await database.container(usageDataContainerName);
  const { resource } = await container.items.create(data);
  return resource;
};

export { uploadUsageData };
