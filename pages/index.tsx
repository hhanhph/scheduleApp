import React, { useEffect } from "react";
import {
  useGetScheduleQuery,
  useIndexCreateScheduleMutation,
} from "../src/graphql/types";
import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";

import * as S from "../lib/styles";
import moment from "moment";
import { gql } from "@apollo/client";

import Schedule from "../src/components/Schedule";
import EditSection from "../src/components/EditSection/EditSection";
import ImageCapture from "../src/components/ImageCapture";

const SchedulePage = () => {
  const defaultDate = new Date();
  const [currDate, setCurrDate] = React.useState(String(defaultDate));
  const { data, loading } = useGetScheduleQuery({
    variables: {
      scheduleDate: currDate,
    },
  });

 
  const [schedulesId, setSchedulesId] = React.useState<string[]>();
  const [schedules, setSchedules] = React.useState<any>();

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
      fillScheduleIds(data?.getSchedules?.map((t: any) => t.scheduleId));
    data?.getSchedules && setSchedules(data.getSchedules);
  }, [data?.getSchedules]);

  const onClickAddSchedule = async (appointment:string,value:string[],source:string) => {
  console.log("URL image source: "+source)
    const result = await createSchedule({
      variables: {
        title: appointment,
        scheduleDate: currDate,
        scheduleTime: value,
        imgSource: source,
      },
    });
    schedulesId && result.data
      ? fillScheduleIds(
          schedulesId.concat(result.data?.createSchedule?.scheduleId)
        )
      : "";
    
  };

  const scheduleElements = schedulesId?.map((id) => (
    <Schedule scheduleId={id} key={id} />
  ));

 
  const body =
    loading ||
    typeof scheduleElements === "undefined" ? null : scheduleElements.length >
      0 ? (
      <>
        <table>
          <tbody>{scheduleElements}</tbody>
        </table>
      </>
    ) : (
      <div>No ToDos!</div>
    );
  return (
    <S.CalendarWrapper>
      <ReactHorizontalDatePicker
        selectedDay={onSelectedDay}
        enableScroll={true}
        enableDays={180}
      />
      <S.ScheduleWrapper>
        <S.ScheduleContent>
    <EditSection onClickAddSchedule={onClickAddSchedule}/>
          {body}
        </S.ScheduleContent>
      </S.ScheduleWrapper>
      <ImageCapture/>
    </S.CalendarWrapper>
  );
};

export default SchedulePage;

gql`
  query GetSchedule($scheduleDate: String!) {
    getSchedules(scheduleDate: $scheduleDate) {
      scheduleId
      title
      scheduleDate
      imgSource
    }
  }
  mutation IndexCreateSchedule(
    $title: String!
    $scheduleDate: String!
    $scheduleTime: [String]!
    $imgSource: String
  ) {
    createSchedule(
      title: $title
      scheduleDate: $scheduleDate
      scheduleTime: $scheduleTime
      imgSource: $imgSource
    ) {
      scheduleId
    }
  }
`;
