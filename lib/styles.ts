import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffedd3;
  padding: 0rem 1rem;
  justify-content: start;
  align-items: center;
  .react-timerange-picker__inputGroup{
    text-align: center;
  }
`;
export const ScheduleWrapper = styled.div`
  background-color: #fcd2d1;

  position: relative;

  border-radius: 25px;
  border: 1px solid #fe8f8f;
  width: 100%;
  max-height: 50%;
  margin-top: 2rem;
  padding: 0.5rem 0 1rem 1rem;
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
    padding: 0.5rem;
  }
`;


