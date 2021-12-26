import styled from "styled-components";
import { SubscribeWrapper } from "../PushNoti/styles";
 
export const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #ffedd3;
  padding: 2rem 0;
  justify-content: start;
  align-items: center;
 
  .datepicker-strip {
    margin-top: 3rem;
  }
  .react-timerange-picker__inputGroup {
    text-align: center;
  }
 
  ${SubscribeWrapper} {
    width: inherit;
    display: flex;
    justify-content: flex-end;
  }
`;
export const ScheduleWrapper = styled.div`
  background-color: #fcd2d1;
  position: relative;
  width: 75%;
  border-radius: 25px;
  border: 1px solid #fe8f8f;
  max-height: 50%;
  margin-top: 2rem;
  padding: 1rem;
  overflow: hidden;
`;
 
export const ScheduleContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 15px;
  }
 
  ::-webkit-scrollbar-track {
    background-color: #fcd2d1;
    border-radius: 100px;
    width: 10px;
  }
 
  ::-webkit-scrollbar-thumb {
    background-color: #fe8f8f;
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
    border-radius: 100px;
    height: 2px;
    width: 10px;
  }
 
  div {
    color: white;
    min-width:0;
  }
`;
 
export const TableContent = styled.table`
  position: relative;
`;
 
export const TableBody = styled.tbody``
 
export const ToggleSlideBtn = styled.button`
background:none;
border:none;
position: fixed;
top: 1.5rem;
left:10px;
min-width: 2rem;
    min-height: 2rem;
 
    &:hover{
        cursor:pointer;
        svg{
 
            color: white
        }
    }
`
