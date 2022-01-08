import React, { useEffect } from "react";
import {
  useGetScheduleQuery,
  useIndexCreateScheduleMutation,
} from "../../../src/graphql/types";
import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
 
import * as S from "./styles";
import moment from "moment";
import { gql } from "@apollo/client";
 
import Schedule from "../Schedule";
import EditSection from "../EditSection";
import PushNoti from "../PushNoti";
 
const SchedulePage = ({ toggle }: any) => {
  const defaultDate = new Date();
  const [currDate, setCurrDate] = React.useState(String(defaultDate));
  const { data, loading } = useGetScheduleQuery({
    variables: {
      scheduleDate: currDate,
    },
  });
 
  const [schedulesId, setSchedulesId] = React.useState<string[]>();
  const [schedules, setSchedules] = React.useState<any>();
  const [noti, setEnableNoti] = React.useState(false);
  const [createSchedule] = useIndexCreateScheduleMutation();
  
  const onSelectedDay = (d: any) => {
    d = moment(d).format("DD-MM-YYYY");
    setCurrDate(d);
  };
  const { data:any, loading:boolean } = useGetScheduleQuery({
    variables: {
      scheduleDate: currDate,
    },
  });
  const fillScheduleIds = (data: string[]) => {
    setSchedulesId(data?.slice().sort((a, b) => a.localeCompare(b)));
  };
  useEffect(() => {
    if ("Notification" in window) {
      setEnableNoti(true);
    }
  }, []);
 
  useEffect(() => {
    data?.getSchedules &&
      fillScheduleIds(data?.getSchedules?.map((t: any) => t.scheduleId));
    data?.getSchedules && setSchedules(data.getSchedules);
  }, [data?.getSchedules]);

  const onClickAddSchedule = async (appointment:string,value:string[],source:string, location:string) => {
    console.log("URL image source: "+source)
      const result = await createSchedule({
        variables: {
          title: appointment,
          scheduleDate: currDate,
          scheduleTime: value,
          imgSource: source,
          location: location
        },
      });
      schedulesId && result.data
        ? fillScheduleIds(
            schedulesId.concat(result.data?.createSchedule?.scheduleId)
          )
        : "";
      
    };
 
  const scheduleElements = schedulesId?.map((event: any) => (
    <Schedule scheduleId={event} key={event.id} />
  ));
 
  const body =
    loading ||
    typeof scheduleElements === "undefined" ? null : scheduleElements.length >
      0 ? (
      <S.TableContent>
          <S.TableBody>{scheduleElements}</S.TableBody>
      </S.TableContent>
    ) : (
      <div>No ToDos!</div>
    );
  return (
    <S.CalendarWrapper>
      <S.ToggleSlideBtn onClick={toggle}>
        <FontAwesomeIcon icon={faBars} color="red" size="3x" />
      </S.ToggleSlideBtn>
      <ReactHorizontalDatePicker
        selectedDay={onSelectedDay}
        enableScroll={true}
        enableDays={180}
      />
      <S.ScheduleWrapper>
        <S.ScheduleContent>
          <EditSection
            onClickAddSchedule={onClickAddSchedule}
          />
       {body}
         </S.ScheduleContent>
      </S.ScheduleWrapper>
 
      {noti && <PushNoti />}
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
      location
    }
  }
  mutation IndexCreateSchedule(
    $title: String!
    $scheduleDate: String!
    $scheduleTime: [String]!
    $imgSource: String
    $location: String
  ) {
    createSchedule(
      title: $title
      scheduleDate: $scheduleDate
      scheduleTime: $scheduleTime
      imgSource: $imgSource
      location: $location
    ) {
      scheduleId
    }
  }
`;
