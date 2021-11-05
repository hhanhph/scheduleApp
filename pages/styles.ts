import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffedd3;
  padding: 0rem 1rem;
  justify-content: center;
  align-items: center;
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
export const Edit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 2rem;
`;
export const Input = styled.input`
  width: 90%;
  height: 100%;
  border: 0;
  background: linear-gradient(#fff, #fff) center bottom 5px / calc(100% - 10px)
    1px no-repeat;
  background-color: transparent;
  padding: 10px;
`;
export const Button = styled.button`
  background-color: white;
  color: white;
  max-width: 30%;
  height: 100%;
  background-color: #fe8f8f;
  border-radius: 50%;
  border: 1px solid #fe8f8f;
  cursor: pointer;
  :hover {
    background-color: pink;
  }
`;
