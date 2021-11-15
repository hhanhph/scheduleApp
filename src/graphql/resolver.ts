import { Resolvers, TodoMvc,Schedule } from "./types";
import connectToDatabase from "../dao";
import { TodoMvcDbObject } from "../dao/types";
import {ScheduleDbObject} from '../dao/types';
import { ObjectId } from "mongodb";
import mongoose from 'mongoose'

const dbPromise = connectToDatabase();

const getCollection = async () => {
  const db = await dbPromise;
  return db.collection("events");
};

const fromDbObject = (doc: any): Schedule => ({
  scheduleId: doc._id.toHexString(),
  title: doc.title,
  scheduleDate: doc.scheduleDate,
  scheduleTime: doc.scheduleTime
});

const resolvers: Resolvers = {
  Query: {
    // allTodos: async () => {
    //   const collection = await getCollection();
    //   return await collection.find().map(fromDbObject).toArray()
    // },
    // Todo: async (_: any, { todoId }) => {
    //   const collection = await getCollection();
    //   const dbObject = await collection.findOne({
    //     _id: ObjectId.createFromHexString(todoId),
    //   });
    //   return fromDbObject(dbObject);
    // },
    getSchedules: async (_: any, {scheduleDate }) => {
        const collection = await getCollection();
        return await collection.find({scheduleDate: scheduleDate}).map(fromDbObject).toArray()
       
     },
       Appointment: async (_: any, {scheduleId }) => {
      const collection = await getCollection();
      const dbObject = await collection.findOne({
        _id: ObjectId.createFromHexString(scheduleId),
      });
      return fromDbObject(dbObject);
    },
  },
  Mutation: {
    createSchedule: async (_: any, { title,scheduleDate,scheduleTime }) => {
      const data: Omit<ScheduleDbObject, "_id"> = {
        title,
        scheduleDate,
        scheduleTime 
      };

      const collection = await getCollection();
      const document = await collection.insertOne(data);
      return fromDbObject({
        ...data,
        _id: document.insertedId,
      });
    },
  
    // createTodo: async (_: any, { description }) => {
    //   const data: Omit<TodoMvcDbObject, "_id"> = {
    //     description,
    //     completed: false,
    //   };

    //   const collection = await getCollection();
    //   const document = await collection.insertOne(data);
    //   return fromDbObject({
    //     ...data,
    //     _id: document.insertedId,
    //   });
    // },
    // updateTodo: async (_: any, { todoId, data }) => {
    //   const collection = await getCollection();
    //   const result = await collection.findOneAndUpdate(
    //     {
    //       _id: ObjectId.createFromHexString(todoId),
    //     },
    //     { $set: data },
    //   );

    //   return fromDbObject(result.value);
    // },
    deleteSchedule: async (_:any,{scheduleId})=>{
      const collection= await getCollection();
      const result = await collection.findOneAndDelete({
        _id: ObjectId.createFromHexString(scheduleId)
      },
      )
return fromDbObject(result.value)
    },
     updateSchedule: async (_: any, { scheduleId, data }) => {
      const collection = await getCollection();
      const result = await collection.findOneAndUpdate(
        {
          _id: ObjectId.createFromHexString(scheduleId),
        },
        { $set: data },
      );

      return fromDbObject(result.value);
    },

  },
};

export default resolvers;