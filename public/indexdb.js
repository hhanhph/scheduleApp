export async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MyTestDatabase", 1);
    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      const scheduleObjectStore = db.createObjectStore("schedules", {
        keyPath: "scheduleid",
        autoIncrement: true,
      });
      const imgObjectStore = db.createObjectStore("images", {
        keyPath: "imgid",
        autoIncrement: true,
      });
      scheduleObjectStore.createIndex("title", "title", { unique: false });
      scheduleObjectStore.createIndex("scheduleDate", "scheduleDate", {
        unique: false,
      });
      scheduleObjectStore.createIndex("scheduleTime", "scheduleTime", {
        unique: false,
      });
      scheduleObjectStore.createIndex("imgSource", "imgSource", {
        unique: false,
      });
      imgObjectStore.createIndex("image", "image", { unique: false });
    };
  });
}

export const addToIndexDB = async (
  appointment,
  scheduleDate,
  scheduleTime,
  imgSource
) => {
  const db = await openDatabase();
  // Add
  const scheduleReadWriteTransaction = db.transaction("schedules", "readwrite");
  const newObjectStore = scheduleReadWriteTransaction.objectStore("schedules");

  newObjectStore.add({
    title: appointment,
    scheduleDate: scheduleDate,
    scheduleTime: scheduleTime,
    imgSource: imgSource,
  });

  scheduleReadWriteTransaction.onsuccess = function (event) {
    console.log("Data Added");
  };
};

export const addImgToIndexDb = async (img) => {
  const db = await openDatabase();
  const imgReadWriteTransaction = db.transaction("images", "readwrite");
  const newObjectStore = imgReadWriteTransaction.objectStore("images");

  return newObjectStore.add({ image: img });
};

export async function displayIndexDb() {
  const db = await openDatabase();
  var readTransaction = db.transaction(["schedules"]);
  var objectStore = readTransaction.objectStore("schedules");
  var request = objectStore.getAll();
  return request;
}

export async function displayImgIndexDb() {
  const db = await openDatabase();
  var readTransaction = db.transaction(["images"], "readonly");
  var objectStore = readTransaction.objectStore("images");
  var request = objectStore.getAll();
  return request;
}

export const updateIndexDb = async (scheduleId, newTitle, newTime) => {
  const db = await openDatabase();
  const objectStore = db
    .transaction(["schedules"], "readwrite")
    .objectStore("schedules");
  const request = objectStore.get(scheduleId);

  request.onsuccess = function (event) {
    const data = event.target.result;
    console.log("Update data " + data.title);
    data.title = newTitle;
    data.scheduleTime = newTime;

    const updateRequest = objectStore.put(data);
    updateRequest.onerror = function (event) {
      throw new Error(
        `Can't update data ${data.title}. ERR: ${updateIndexDb.error}`
      );
    };

    updateRequest.onsuccess = function (event) {
      console.log("Data Updated!");
    };
  };
};

export const deleteIndexDb = async (scheduleid) => {
  console.log("Need To delete " + scheduleid);
  const db = await openDatabase();
  const request = db
    .transaction(["schedules"], "readwrite")
    .objectStore("schedules")
    .delete(scheduleid);
  request.onerror = function (event) {
    throw new Error(`Can't delete data ${scheduleid}. ERR: ${request.error}`);
  };
  request.onsuccess = function (event) {
    console.log("Deleted!");
  };
};

export const deleteImageIndexDb = async (id) => {
  const db = await openDatabase();
  const request = db
    .transaction(["images"], "readwrite")
    .objectStore("images")
    .delete(id);
  request.onerror = function (event) {
    throw new Error(`Can't delete data ${id}. ERR: ${request.error}`);
  };
  request.onsuccess = function (event) {
    console.log("Deleted!");
  };
};
