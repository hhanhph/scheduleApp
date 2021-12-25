import styled from 'styled-components'

export const Element = styled.div`
display: flex;
flex-direction: row;
width: 95%;
min-height: fit-content;
border: 2px solid white;
border-radius: 25px;
margin: 1rem 0;
justify-content: space-between;
`

export const Button=styled.button`
min-width: 0.5rem;
flex: 1 ;
color: white;
border-radius: 25px;
border: 0;
background-color: white;
color: grey;
:hover{
    background-color: #FE8F8F;
    color:white;
};
margin: 10px;
`

export const Input=styled.input`
border:none;
width: inherit;
height:100%;
flex: 4;
background-color:transparent;
background:linear-gradient(#fff, #fff) center bottom 1px /calc(100% - 10px) 1px no-repeat;
:focus{
    border:0
} `

export const Content=styled.div`
flex:4;
`
export const InputWrapper=styled.div`
display: flex;
flex-direction: column;
flex: 4;`

export const ScheduleDetail=styled.div`
padding:10px
`