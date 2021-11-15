import React, { useEffect } from "react";
import {
  useGetScheduleQuery,
  useIndexCreateScheduleMutation,
} from "../src/graphql/types";
import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker/dist/entry.nostyle'
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
 import 'react-clock/dist/Clock.css'; 
 import AnimateHeight from 'react-animate-height';

import * as S from "../lib/styles";
import moment from "moment";
import { gql } from "@apollo/client";
import Schedule from '../src/components/Schedule'
import Head from "next/head";

const SchedulePage = () => {
  const defaultDate = new Date();
  const [currDate, setCurrDate] = React.useState(String(defaultDate));
  const { data, loading } = useGetScheduleQuery({
    variables: {
      scheduleDate:currDate,
    },
  });
 
 
  const [appointment, setAppointment] = React.useState("");
  const [schedulesId, setSchedulesId] = React.useState<string[]>();
  const [schedules,setSchedules]=React.useState<any>()
  const [value, onChange] = React.useState(['10:00', '11:00']);
 const [height,setHeight] = React.useState<number|string>()

  const toggle = () => {

    setHeight(height === 0 ? 'auto' : 0);
  };
  const [createSchedule] = useIndexCreateScheduleMutation();
  const onSelectedDay = (d: any) => {
    d = moment(d).format("DD-MM-YYYY");
    setCurrDate(d);
  };

  const fillScheduleIds = (data: string[]) => {
    setSchedulesId(data?.slice().sort((a, b) => a.localeCompare(b)));
  };

  useEffect(() => {
    data?.getSchedules &&
      fillScheduleIds(data?.getSchedules?.map((t:any) => t.scheduleId));
      data?.getSchedules &&
      setSchedules(data.getSchedules);
  }, [data?.getSchedules]);

  useEffect(()=>{
    setHeight(0)

  },[])

  const onClickAddSchedule = async () => {
    const result = await createSchedule({
      variables: {
        title: appointment,
        scheduleDate: currDate,
        scheduleTime: value
      },
    });
    schedulesId && result.data
      ? fillScheduleIds(
          schedulesId.concat(result.data?.createSchedule?.scheduleId)
        )
      : "";
    setAppointment("");
  };
  const scheduleElements = schedulesId?.map((id) => <Schedule scheduleId={id} key={id} />);
const handleCapture = (target:HTMLInputElement)=>{
  if (target.files) {
    if (target.files.length !== 0) {
      const file = target.files[0];
      const newUrl = URL.createObjectURL(file);
      //setSource(newUrl);
    }
  }
}
  const body =
    loading ||
    typeof scheduleElements === "undefined" ? null : scheduleElements.length > 0 ? (
      <>
        <table>
          <tbody>{scheduleElements}</tbody>
        </table>
      </>
    ) : (
      <div>No ToDos!</div>
    );
  return (
    <>
    <Head>

    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" >
    </script>
</Head>
    <S.CalendarWrapper>    
      <ReactHorizontalDatePicker
        selectedDay={onSelectedDay}
        enableScroll={true}
        enableDays={180}
      />
<S.ScheduleWrapper>

      <S.ScheduleContent>
        <S.EditSection>
        <S.EditButton 
          aria-expanded={ height !== 0 }
          aria-controls='example-panel'
          onClick={toggle}
        >
          { height === 0 ? 'Plan new schedule' : 'Close' }
        </S.EditButton>

        <AnimateHeight
          id='example-panel'
          duration={ 500 }
          height={ height } // see props documentation below
        >
     
        <S.Edit>
          <S.Input
            type="text"
            aria-labelledby="appointmentInput-label"
            placeholder="Add new appointment here"
            value={appointment}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setAppointment(e.currentTarget.value)
            }
          />
            <TimeRangePicker
             disableClock={true}
        onChange={onChange}
        value={value}
      />
      <S.UpImgLabel htmlFor="file-upload">
    <i></i> Custom Upload
</S.UpImgLabel>
         <S.UpImgInput
            accept="image/*"
            id="file-upload"
            type="file"
            capture="environment"
            onChange={(e) => handleCapture(e.target)}
          />
          <S.Button onClick={onClickAddSchedule}>+</S.Button>
        </S.Edit>
        </AnimateHeight>
        </S.EditSection>
      {body}
      </S.ScheduleContent>
     
      </S.ScheduleWrapper>
    </S.CalendarWrapper>
    </>
  );
};

export default SchedulePage;

gql`
  query GetSchedule($scheduleDate: String!) {
    getSchedules(scheduleDate: $scheduleDate) {
      scheduleId
      title
      scheduleDate

    }
  }
  mutation IndexCreateSchedule($title: String!, $scheduleDate: String!,$scheduleTime: [String]!) {
    createSchedule(title: $title, scheduleDate: $scheduleDate, scheduleTime: $scheduleTime) {
      scheduleId
    }
  }
`;
