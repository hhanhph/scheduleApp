import styled from "styled-components";

export const Edit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 2rem;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  border: 0;
  background: linear-gradient(#fff, #fff) center bottom 5px / calc(100% - 10px)
    1px no-repeat;
  background-color: transparent;
  padding: 15px 0;
  margin: 0.5rem 0;
`;
export const Button = styled.button`
  background-color: white;
  color: white;
  width: 100%;
  max-height: 1rem;
  background-color: #fe8f8f;
  border: 1px solid #fe8f8f;
  margin-top: 0.5rem;
  cursor: pointer;
  :hover {
    background-color: pink;
  }
`;

export const EditSection = styled.div`
  width: 95%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: relative;

  .react-timerange-picker__wrapper{
    padding: 0 !important;
  }
`;

export const EditButton = styled.button`
  width: 100%;
  height: fit-content;
  border: 2px solid white;
  color: tomato;
  :hover {
    background-color: pink;
    color: white;
  }
`;
export const UpImgInput = styled.input`
  display: none;
`;

export const UpImgLabel = styled.label`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 10px;
  margin: 8px;
  cursor: pointer;
`;
