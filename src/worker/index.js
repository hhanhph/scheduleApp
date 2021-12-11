"use strict";
import {
  displayImgIndexDb,
  addToIndexDB,
  deleteImageIndexDb,
} from "../../public/indexdb";

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
            let savedImages = data.result;
            for (var img of savedImages) {
              addToIndexDB("", "", "", img.image);
              let id = new Date().toISOString;
              const uploadTask = storage
                .ref(`/images/${id}`)
                .putString(img.image.split(",")[1], "base64", {
                  contentType: "image/png",
                });
              uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (error) => {
                  console.log(error);
                },
                () => {
                  storage
                    .ref("images")
                    .child(id)
                    .getDownloadURL()
                    .then((url) => {
                      console.log("DownloadURL2: " + url);
                    });
                }
              );
              deleteImageIndexDb(img.imgid);
            }
          };
        })
        .catch((error) => {
          throw new Error("Can't display data: " + error);
        })
    );
  }
});
