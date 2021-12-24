import { useEffect, useState } from 'react'
import {db} from '../EditSection/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import *as S from './styles'

const base64ToUint8Array = base64 => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(b64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

 const PushNoti= () => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [registration, setRegistration] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(reg => {
        reg.pushManager.getSubscription().then(sub => {
          if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
            setSubscription(sub)
            console.log("Sub: "+sub)
            setIsSubscribed(true)
          }
        })
        setRegistration(reg)
      })
    }
  }, [])

  const displayConfirmNoti=()=>{
    if('serviceWorker' in navigator){
      var options={
        body:'Successfully subscribed to schedule app',
        icon:'/icons/icon-32x32.png',
        dir:'ltr',
        tag:'confirm-noti',
        renotify: true,
        actions:[
          {action:'confirm',title:'success',icon:'/icons/icon-32x32.png'},
          {action:'cancel',title:'cancel',icon:'/icons/icon-32x32.png'}
        ]
      }
      navigator.serviceWorker.ready.then(swreg=>{swreg.showNotification('Successfully subscribed',options)})
    }
  }

  const configurePushSub = ()=>{
    if(!('serviceWorker')in navigator){
      return
    }
var reg;
    navigator.serviceWorker.ready.then((swreg)=>{
      reg=swreg
      swreg.pushManager.getSubscription();
    })
    .then((sub)=>{
      if(sub===null){
        //Create new subscribtion
       reg.pushManager.subscribe({
          userVisibleOnly:true,
          applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
        }).then((newSub)=>{
          console.log("New sub:"+JSON.stringify(newSub))
        });
      }else{

      }
    })
  }

  const subscribeButtonOnClick = async event => {
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
    })   
    setSubscription(sub)
    setIsSubscribed(true)
    console.log('web push subscribed!')
    displayConfirmNoti()

    db.collection('subscriptions').doc('scheduleApp').set((sub.toJSON()))
  }

  const unsubscribeButtonOnClick = async event => {
    event.preventDefault()
    await subscription.unsubscribe()
    // TODO: you should call your API to delete or invalidate subscription data on server

    setSubscription(null)
    setIsSubscribed(false)
    console.log('web push unsubscribed!')
  }

  const sendNotificationButtonOnClick = async event => {
    event.preventDefault()
    if (subscription == null) {
      console.error('web push not subscribed')
      return
    }

    await fetch('/api/notification', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription
      })
    })
  }

  return (
    <S.SubscribeWrapper>
     <S.SubscribeBtn onClick={subscribeButtonOnClick} disabled={isSubscribed}>
      <FontAwesomeIcon icon={faBell} color='#f05d4a' size='3x' />
      </S.SubscribeBtn>
      {/* <button onClick={unsubscribeButtonOnClick} disabled={!isSubscribed}>
        Unsubscribe
      </button>
      <button onClick={sendNotificationButtonOnClick} disabled={!isSubscribed}>
        Send Notification
      </button> */}
    </S.SubscribeWrapper>
  )
}

export default PushNoti