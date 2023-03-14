// Get Identity Client
import { DefaultAzureCredential } from "@azure/identity";

// Get Cosmos Client
import { CosmosClient } from "@azure/cosmos";
import { deleteQuestion, Question } from "../app/questions";

const databaseName = "master-db";
const questionContainerName = "questions";
const partitionKeyPath = ["/questions"];

// Provide required connection from environment variables
const key = process.env.REACT_APP_COSMOS_KEY;
// Endpoint format: https://YOUR-RESOURCE-NAME.documents.azure.com:443/
const endpoint = process.env.REACT_APP_COSMOS_ENDPOINT;

const cosmosClient = new CosmosClient({ endpoint, key });

const initDatabase = async (): Promise<Question[]> => {
  const database = await cosmosClient.database(databaseName);

  //await database.container(questionContainerName).delete();
  const { container } = await database.containers.createIfNotExists({
    id: questionContainerName,
    partitionKey: {
      paths: partitionKeyPath,
    },
  });

  const querySpec = {
    query: "select * from questions",
  };

  const { resources } = await container.items.query(querySpec).fetchAll();

  return resources;
};

export { initDatabase, databaseName, questionContainerName, cosmosClient };
