import React from 'react'
import * as S from './styles'
const BackDrop=({closeDrawer}:any)=>{
    return <S.BackDrop onClick={closeDrawer}></S.BackDrop>
}

export default BackDrop