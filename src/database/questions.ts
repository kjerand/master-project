import { Question } from "../store/questions";
import { cosmosClient, databaseName, questionContainerName } from "./database";

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

export { createQuestions, createQuestion, removeQuestion };
