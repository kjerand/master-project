import { cosmosClient, databaseName, usageDataContainerName } from "./database";

const uploadUsageData = async (
  actionType: string,
  userID: string,
  questionID: string,
  subject: string,
  variant: string,
  code?: string
) => {
  var d = new Date();
  const data: UsageData = {
    type: actionType,
    userID: userID,
    questionID: questionID,
    timestamp: d.toLocaleString(),
    code: code,
    variant: variant,
    subject: subject,
  };

  const database = await cosmosClient.database(databaseName);
  const container = await database.container(usageDataContainerName);
  const { resource } = await container.items.create(data);
  return resource;
};

export { uploadUsageData };
