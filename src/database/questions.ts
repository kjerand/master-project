import { cosmosClient, databaseName, questionContainerName } from "./database";

const fetchQuestions = async (): Promise<Question[]> => {
  const database = await cosmosClient.database(databaseName);
  const container = await database.container(questionContainerName);

  const querySpec = {
    query: "select * from questions",
  };

  const { resources } = await container.items.query(querySpec).fetchAll();

  return resources;
};

const createQuestion = async (question: Question) => {
  const database = await cosmosClient.database(databaseName);
  const container = await database.container(questionContainerName);
  const { resource } = await container.items.create(question);
  return resource;
};

const createQuestions = async (questions: Question[]) => {
  const database = await cosmosClient.database(databaseName);
  const container = await database.container(questionContainerName);

  for (let question of questions) {
    await container.items.create(question);
  }
};

const removeQuestion = async (id: string) => {
  const database = await cosmosClient.database(databaseName);
  const container = await database.container(questionContainerName);
  await container.item(id).delete();
};

export { fetchQuestions, createQuestions, createQuestion, removeQuestion };
