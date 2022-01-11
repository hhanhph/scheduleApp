const webPush = require("web-push");
import { db } from "../../src/components/EditSection/firebase";
webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
);

const SendNoti = async (req, res) => {
  if (req.method == "POST") {
    const { subscription } = req.body;
    // db.collection("subscriptions").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()}`);
    //         var subscription = {
    //           endpoint: doc.data().endpoint,
    //           keys:{
    //             auth: doc.data().keys.auth,
    //             p256dh: doc.data().keys.p256dh
    //           }
    //         }
    //       }
    //     )
    //     })
    webPush
      .sendNotification(
        subscription,
        JSON.stringify({
          title: "Hello Web Push",
          message: "Your web push notification is here!",
        })
      )
      .then((response) => {
        res.writeHead(response.statusCode, response.headers).end(response.body);
      })
      .catch((err) => {
        if ("statusCode" in err) {
          res.writeHead(err.statusCode, err.headers).end(err.body);
        } else {
          console.error(err);
          res.statusCode = 500;
          res.end();
        }
      });
  } else {
    res.statusCode = 405;
    res.end();
  }
};

export default SendNoti;
