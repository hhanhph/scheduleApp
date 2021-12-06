import { openDb } from "idb";

export const db = openDb("ClientDb", 1, {
  upgrade(db) {
    const events = db.createObjectStore("schedules", {
      // The 'id' property of the object will be the key.
      keyPath: "id",
      // If it isn't explicitly set, create a value by auto incrementing.
      autoIncrement: true,
    });
    // Create an index on the 'date' property of the objects.
    events.createIndex("title", "title");
    events.createIndex("scheduleDate", "scheduleDate");
    events.createIndex("scheduleTime", "scheduleTime");
    events.createIndex("imgSource", "imgSource");
  },
});
