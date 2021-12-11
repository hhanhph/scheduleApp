import React from "react";
import Calendar from "../src/components/Calendar";
import SlideDrawer from "../src/components/SlideDrawer";
import BackDrop from "../src/components/BackDrop";
import * as S from '../lib/styles'
const HomePage=()=>{
const [openDrawer,setOpenDrawer]=React.useState<boolean>(false)

const  drawerToggleClickHandler = () => {
  setOpenDrawer(!openDrawer)
}

const backdropClickHandler = ()=>{
  setOpenDrawer(false)
}
return (
  <S.HomePage>
    <SlideDrawer isOpen={openDrawer}/>
    {openDrawer && <BackDrop closeDrawer={backdropClickHandler}/>}
    <Calendar toggle={drawerToggleClickHandler}/>
  </S.HomePage>
)
}

export default HomePage