import React from "react";
import { gql } from "@apollo/client";
import { useState, ChangeEvent, useEffect } from "react";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker/dist/entry.nostyle";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import Image from "next/image";
import * as S from "./styles";
import { deleteIndexDb, updateIndexDb } from "../../../public/indexdb";

type scheduleData = {
  scheduleid: number;
  title: string;
  scheduleDate: string;
  scheduleTime: string[];
  imgSource?: string;
  location?: string
};

export type EventType = {
  eventData: scheduleData;
};

const Schedule = ({ eventData }: EventType) => {
  const { scheduleid, title, scheduleDate, scheduleTime, imgSource, location } =
    eventData;
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [value, onChange] = React.useState(["00:00", "00:00"]);

  const onDelete = () => {
    deleteIndexDb(scheduleid);
  };

  const onInputChange = (e: ChangeEvent) => {
    let target = e.target as HTMLInputElement;
    setInput(target.value);
  };
  let content = <h1>Loading....</h1>;

  if (eventData) {
    content = (
      <S.ScheduleDetail>
        <>{title}</>
        <br />
        {scheduleTime && (
          <p>
            {scheduleTime[0]}-{scheduleTime[1]}{" "}
          </p>
        )}
        {imgSource && (
          <S.InputWrapper>
          <Image
            src={imgSource}
            alt={`img-${imgSource}`}
            width="650px"
            height="300px"
          ></Image>
          </S.InputWrapper>
        )}
        {location&&
        <p>Location: {location}</p>}
      </S.ScheduleDetail>
    );
  }

  useEffect(() => {
    setInput(title || "");
  }, [title]);

  return (
    <S.Element>
      {isEditing ? (
        <S.InputWrapper>
          <S.Input placeholder={title} onChange={onInputChange}></S.Input>
          <TimeRangePicker
            disableClock={true}
            onChange={onChange}
            value={value}
          />
        </S.InputWrapper>
      ) : (
        <S.Content>{content}</S.Content>
      )}
      <S.Button onClick={() => onDelete()}>Delete</S.Button>
      <S.Button
        onClick={() => {
          if (isEditing === true) {
            updateIndexDb(scheduleid, input, value);
          }
          setIsEditing(!isEditing);
        }}
      >
        {isEditing ? "Save" : "Edit"}
      </S.Button>
    </S.Element>
  );
};

export default Schedule;

gql`
  query Appointment($scheduleId: ID!) {
    Appointment(scheduleId: $scheduleId) {
      title
      scheduleDate
      scheduleTime
      imgSource
    }
  }

  mutation DeleteSchedule($scheduleId: ID!) {
    deleteSchedule(scheduleId: $scheduleId) {
      title
      scheduleDate
    }
  }

  mutation UpdateSchedule($scheduleId: ID!, $data: UpdateScheduleInput!) {
    updateSchedule(scheduleId: $scheduleId, data: $data) {
      title
      scheduleTime
    }
  }
`;
