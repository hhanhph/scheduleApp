import { Resolvers, Schedule } from "./types";
import connectToDatabase from "../dao";
import { ScheduleDbObject } from "../dao/types";
import { ObjectId } from "mongodb";

const dbPromise = connectToDatabase();

const getCollection = async () => {
  const db = await dbPromise;

  return db.collection("events");
};

const fromDbObject = (doc: any): Schedule => ({
  scheduleId: doc._id.toHexString(),
  title: doc.title,
  scheduleDate: doc.scheduleDate,
  scheduleTime: doc.scheduleTime,
  imgSource: doc.imgSource,
  location: doc.location,
});

const resolvers: Resolvers = {
  Query: {
    getSchedules: async (_: any, { scheduleDate }) => {
      const collection = await getCollection();

      return await collection
        .find({ scheduleDate: scheduleDate })
        .map(fromDbObject)
        .toArray();
    },
    Appointment: async (_: any, { scheduleId }) => {
      const collection = await getCollection();
      const dbObject = await collection.findOne({
        _id: ObjectId.createFromHexString(scheduleId),
      });

      return fromDbObject(dbObject);
    },
  },
  Mutation: {
    createSchedule: async (
      _: any,
      { title, scheduleDate, scheduleTime, imgSource, location }
    ) => {
      const data: Omit<ScheduleDbObject, "_id"> = {
        title,
        scheduleDate,
        scheduleTime,
        imgSource,
        location,
      };
      const collection = await getCollection();
      const document = await collection.insertOne(data);

      return fromDbObject({
        ...data,
        _id: document.insertedId,
      });
    },

    deleteSchedule: async (_: any, { scheduleId }) => {
      const collection = await getCollection();
      const result = await collection.findOneAndDelete({
        _id: ObjectId.createFromHexString(scheduleId),
      });

      return fromDbObject(result.value);
    },
    updateSchedule: async (_: any, { scheduleId, data }) => {
      const collection = await getCollection();
      const result = await collection.findOneAndUpdate(
        {
          _id: ObjectId.createFromHexString(scheduleId),
        },
        { $set: data }
      );

      return fromDbObject(result.value);
    },
  },
};

export default resolvers;
