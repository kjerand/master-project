// Get Identity Client
import { DefaultAzureCredential } from "@azure/identity";

// Get Cosmos Client
import { CosmosClient } from "@azure/cosmos";
import { deleteQuestion } from "../store/questions";

const databaseName = "master-db";
const questionContainerName = "questions";
const usageDataContainerName = "usage";
const partitionKeyPath = ["/questions"];
const usagePartitionKeyPath = ["/usage"];
// Provide required connection from environment variables
const key = process.env.REACT_APP_COSMOS_KEY;
// Endpoint format: https://YOUR-RESOURCE-NAME.documents.azure.com:443/
const endpoint = process.env.REACT_APP_COSMOS_ENDPOINT;

const cosmosClient = new CosmosClient({ endpoint, key });

const initDatabase = async () => {
  const database = await cosmosClient.database(databaseName);

  const { container } = await database.containers.createIfNotExists({
    id: usageDataContainerName,
    partitionKey: {
      paths: usagePartitionKeyPath,
    },
  });
};

export {
  initDatabase,
  databaseName,
  questionContainerName,
  usageDataContainerName,
  cosmosClient,
};
