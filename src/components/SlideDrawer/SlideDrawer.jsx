import {React,useEffect,useState} from "react"
import * as S from './styles'

const SlideDrawer=({isOpen})=>{
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [subscription, setSubscription] = useState(null)
    const [registration, setRegistration] = useState(null)
  
    useEffect(() => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        // run only in browser
     
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
    const unsubscribeButtonOnClick = async event => {
        event.preventDefault()
        await subscription.unsubscribe()
        // TODO: you should call your API to delete or invalidate subscription data on server
    
        setSubscription(null)
        setIsSubscribed(false)
        console.log('web push unsubscribed!')
      }
    
    return <S.SlideDrawerWrapper isOpen={isOpen}>
      <h1>Settings</h1>
      <button>Change Theme</button>
        <button onClick={unsubscribeButtonOnClick}>
        Unsubscribe
      </button>
    </S.SlideDrawerWrapper>
}

export default SlideDrawer