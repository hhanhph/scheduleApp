import React, { useEffect } from "react";
import {
  useGetSchedulesQuery,
  useIndexCreateScheduleMutation,
} from "../src/graphql/types";
import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import * as S from "./styles";
import moment from "moment";
import { gql } from "@apollo/client";
import Schedule from '../src/components/Schedule'

const SchedulePage = () => {
  const { data, loading } = useGetSchedulesQuery();
  const defaultDate = new Date();
  const [currDate, setCurrDate] = React.useState(String(defaultDate));
  const [appointment, setAppointment] = React.useState("");
  const [schedulesId, setSchedulesId] = React.useState<string[]>();
  const [schedules,setSchedules]=React.useState<any>()

  const [createSchedule] = useIndexCreateScheduleMutation();
  const onSelectedDay = (d: any) => {
    d = moment(d).format("DD-MM-YYYY");
    setCurrDate(String(d));
  };

  const fillScheduleIds = (data: string[]) => {
    setSchedulesId(data?.slice().sort((a, b) => a.localeCompare(b)));
  };

  useEffect(() => {
    data?.allSchedules &&
      fillScheduleIds(data?.allSchedules?.map((t:any) => t.scheduleId));
      data?.allSchedules &&
      setSchedules(data.allSchedules);
  }, [data?.allSchedules]);

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
    </S.CalendarWrapper>
  );
};

export default SchedulePage;

gql`
  query GetSchedules {
    allSchedules {
      scheduleId
      title
    }
  }
  mutation IndexCreateSchedule($title: String!, $scheduleDate: String!) {
    createSchedule(title: $title, scheduleDate: $scheduleDate) {
      scheduleId
    }
  }
`;
