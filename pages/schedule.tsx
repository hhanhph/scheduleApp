import React, { useEffect } from "react";
import {
  useGetScheduleQuery,
  useIndexCreateScheduleMutation,
} from "../src/graphql/types";
import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import * as S from "./styles";
import moment from "moment";
import { gql } from "@apollo/client";
import Schedule from '../src/components/Schedule'

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

  const [createSchedule] = useIndexCreateScheduleMutation();
  const onSelectedDay = (d: any) => {
    d = moment(d).format("DD-MM-YYYY");
    setCurrDate(d);
    console.log("Today is "+currDate.localeCompare('06-11-2021'))
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
    console.log("changed date")
    console.log(currDate)
  },[currDate])

  const onClickAddSchedule = async () => {
    const result = await createSchedule({
      variables: {
        title: appointment,
        scheduleDate: currDate,
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
    <S.CalendarWrapper>
      <ReactHorizontalDatePicker
        selectedDay={onSelectedDay}
        enableScroll={true}
        enableDays={180}
      />
<S.ScheduleWrapper>
      <S.ScheduleContent>
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
          <S.Button onClick={onClickAddSchedule}>+</S.Button>
        </S.Edit>
      {body}
      </S.ScheduleContent>
      </S.ScheduleWrapper>
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
    }
  }
  mutation IndexCreateSchedule($title: String!, $scheduleDate: String!) {
    createSchedule(title: $title, scheduleDate: $scheduleDate) {
      scheduleId
    }
  }
`;
