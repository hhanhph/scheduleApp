import React from "react";
import { gql } from "@apollo/client";
import {
  useAppointmentQuery,
  useDeleteScheduleMutation,
  useUpdateScheduleMutation,
} from "../../graphql/types";
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
  imgSource: string;
};

export type EventType = {
  eventData: scheduleData;
};

interface Props {
  scheduleId: string;
}

// const Schedule = ({eventData}:EventType) => {
const Schedule = (props: Props) => {
  //const {scheduleid,title,scheduleDate,scheduleTime,imgSource}=eventData
  const { scheduleId } = props;
  const { loading, data } = useAppointmentQuery({
    variables: {
      scheduleId,
    },
  });
  const [deleteSchedule] = useDeleteScheduleMutation();
  const [updateSchedule] = useUpdateScheduleMutation();
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [value, onChange] = React.useState(["00:00", "00:00"]);

  const onDelete = () => {
    //deleteIndexDb(scheduleid)
    deleteSchedule({
      variables: {
        scheduleId,
      },
    });
    window.location.reload();
  };

  const onInputChange = (e: ChangeEvent) => {
    let target = e.target as HTMLInputElement;
    setInput(target.value);
  };
  let content = <h1>Loading....</h1>;

  //   if( eventData ){
  //   content=(
  //     <>
  //   <>{title}</><br/>
  // {scheduleTime&&<p>{scheduleTime[0]}-{scheduleTime[1]} </p>}
  // {imgSource&&<Image src={imgSource} alt={`img-${imgSource}`} width="100px" height="100px"></Image>}
  //   </>
  //   )
  // }
  if (!loading && data?.Appointment) {
    const newTitle = String(data?.Appointment?.title);
    const image = String(data?.Appointment?.imgSource);
    console.log("Image: " + image);
    content = (
      <S.ScheduleDetail>
        <>{newTitle}</>
        <br />
        {data?.Appointment.scheduleTime && (
          <p>
            {data.Appointment.scheduleTime[0]}-
            {data.Appointment.scheduleTime[1]}{" "}
          </p>
        )}
        {image && (
          <Image
            src={image}
            alt={`img-${data.Appointment.imgSource}`}
            width="100px"
            height="100px"
          ></Image>
        )}
      </S.ScheduleDetail>
    );
  }
  // useEffect(() => {
  //   setInput(title||'');
  // }, [title]);
  useEffect(() => {
    setInput(data?.Appointment?.title || "");
  }, [data?.Appointment?.title]);
  //   return <S.Element>{isEditing?
  //     <S.InputWrapper>
  //   <S.Input placeholder={title} onChange={onInputChange}></S.Input><TimeRangePicker
  //   disableClock={true}
  // onChange={onChange}
  // value={value}
  // /></S.InputWrapper>:<S.Content>{content}</S.Content>}
  // <S.Button onClick={()=>onDelete()}>Delete</S.Button>
  // <S.Button onClick={() => {

  //     if(isEditing===true){

  //       updateIndexDb(scheduleid,input,value)
  //     }
  //     setIsEditing(!isEditing)
  //   }
  // }>{isEditing?'Save':'Edit'}</S.Button></S.Element>
  return (
    <S.Element>
      {isEditing ? (
        <S.InputWrapper>
          <S.Input
            placeholder={data?.Appointment?.title}
            onChange={onInputChange}
          ></S.Input>
          <TimeRangePicker
            disableClock={true}
            onChange={onChange}
            value={value}
          />
        </S.InputWrapper>
      ) : (
        <S.Content>{content}</S.Content>
      )}
      <S.Button onClick={onDelete}>Delete</S.Button>
      <S.Button
        onClick={() => {
          if (isEditing === true) {
            updateSchedule({
              variables: {
                scheduleId,
                data: {
                  title: input,
                  scheduleTime: value,
                },
              },
            });
            window.location.reload();
            console.log("Time Value: " + JSON.stringify(value));
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
