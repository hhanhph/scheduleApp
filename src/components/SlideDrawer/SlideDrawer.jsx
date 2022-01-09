import { React, useEffect, useState } from "react";
import { db } from "../EditSection/firebase";
import * as S from "./styles";

const SlideDrawer = ({ isOpen }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [registration, setRegistration] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (sub) {
            setSubscription(sub);
            console.log("Sub2: " + JSON.stringify(sub));
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });
    }
  }, [isSubscribed]);

  const unsubscribeButtonOnClick = async (event) => {
    event.preventDefault();
    await subscription.unsubscribe();
    setSubscription(null);
    setIsSubscribed(false);
    console.log("web push unsubscribed!");
  };

  const sendNotificationButtonOnClick = async (event) => {
    event.preventDefault();
    if (subscription == null) {
      console.error("web push not subscribed");
      return;
    }

    await fetch("/api/notification", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        subscription,
      }),
    });
  };

  return (
    <S.SlideDrawerWrapper isOpen={isOpen}>
      <h1>Settings</h1>
      <button>Change Theme</button>
      <button onClick={unsubscribeButtonOnClick}>Unsubscribe</button>
      <button onClick={sendNotificationButtonOnClick}>
        Send push notification
      </button>
    </S.SlideDrawerWrapper>
  );
};

export default SlideDrawer;
