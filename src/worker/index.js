"use strict";
import { displayImgIndexDb, deleteImageIndexDb } from "../../public/indexdb";
import { storage } from "../components/EditSection/firebase";
self.addEventListener("push", function (event) {
  const data = JSON.parse(event.data.text());
  console.log("Sending Push notification");
  event.waitUntil(
    registration.showNotification(data.title, {
      body: data.message,
      icon: "/icons/icon-32x32.png",
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  var action = event.action;

  if (action === "confirm") {
    event.notification.close();
  } else {
    console.log(action);
  }
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        if (clientList.length > 0) {
          let client = clientList[0];
          for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
              client = clientList[i];
            }
          }
          return client.focus();
        }
        return clients.openWindow("/");
      })
  );
});

self.addEventListener("notificationclose", function (event) {
  console.log("CLOSE");
});

//internet connection is available
self.addEventListener("sync", function (event) {
  console.log("Internet connection detected", event);
  if (event.tag === "sync-new") {
    console.log("Syncing new image");
    event.waitUntil(
      displayImgIndexDb()
        .then((data) => {
          data.onsuccess = function () {
            // store the result of opening the database.
            console.log("Data: " + JSON.stringify(data.result));
            for (var img of data.result) {
              console.log("Uploading...." + JSON.stringify(img.image));
              var id = new Date().toISOString();
              storage
                .ref(`/images/${id}`)
                .put(img.image)
                .then((snapshot) => {
                  snapshot.ref.getDownloadURL().then((url) => {
                    console.log(" * new url", url);
                  });
                })
                .catch((err) => {
                  console.log("Can't upload blob file to firebase: " + err);
                });
            }
          };
        })
        .catch((error) => {
          throw new Error("Can't display data: " + error);
        })
    );
  }
});
