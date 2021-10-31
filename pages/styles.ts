import styled from "styled-components"

export const CalendarWrapper=styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #FFEDD3;
  padding: 0rem 1rem;
  justify-content: center;
  align-items: center;
`

export const ScheduleContent=styled.ul`
background-color: #FCD2D1;
display: flex;
position:relative;
flex-direction: column;
margin: 2rem;
border-radius: 25px;
border: 1px solid #FE8F8F;
width: 100%;
max-height:50% ;
padding:3rem;
div{
color: white;
padding: .5rem
 }

`
export const Edit=styled.div`
width:100%;
display:flex;
flex-direction: row;
justify-content:space-between;
padding-bottom: 2rem;
`
export const Input=styled.input`
width: 90%;
height: 100%;
border:0;
background: 
linear-gradient(#fff, #fff) center bottom 5px /calc(100% - 10px) 1px no-repeat;
  background-color: transparent;
  padding: 10px;

`
export const Button = styled.button`
  background-color: white;
  color: white;
  max-width: 30%;
  height: 100%;
  background-color: #FE8F8F;
  border-radius: 50%;
  border: 1px solid #FE8F8F;
  cursor: pointer;
  :hover{
background-color: pink;
  }
`;