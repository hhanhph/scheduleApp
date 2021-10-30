import { Resolvers, TodoMvc } from "./types";
import connectToDatabase from "../dao";
import { TodoMvcDbObject } from "../dao/types";
import { ObjectId } from "mongodb";
import mongoose from 'mongoose'

const dbPromise = connectToDatabase();

const getCollection = async () => {
  const db = await dbPromise;
  return db.collection("events");
};

const fromDbObject = (doc: any): TodoMvc => ({
  todoId: doc._id.toHexString(),
  completed: doc.completed,
  description: doc.description,
});

const resolvers: Resolvers = {
  Query: {
    allTodos: async () => {
      const collection = await getCollection();
      return await collection.find().map(fromDbObject).toArray()
    },
    Todo: async (_: any, { todoId }) => {
      const collection = await getCollection();
      const dbObject = await collection.findOne({
        _id: ObjectId.createFromHexString(todoId),
      });
      return fromDbObject(dbObject);
    },
  },
  Mutation: {
    createTodo: async (_: any, { description }) => {
      const data: Omit<TodoMvcDbObject, "_id"> = {
        description,
        completed: false,
      };

      const collection = await getCollection();
      const document = await collection.insertOne(data);
      return fromDbObject({
        ...data,
        _id: document.insertedId,
      });
    },
    updateTodo: async (_: any, { todoId, data }) => {
      const collection = await getCollection();
      const result = await collection.findOneAndUpdate(
        {
          _id: ObjectId.createFromHexString(todoId),
        },
        { $set: data },
      );

      return fromDbObject(result.value);
    },
  },
};

export default resolvers;