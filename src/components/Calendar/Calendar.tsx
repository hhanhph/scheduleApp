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

import { addToIndexDB, displayIndexDb } from "../../../public/indexdb";

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

  const fillScheduleIds = (data: string[]) => {
    setSchedulesId(data?.slice().sort((a, b) => a.localeCompare(b)));
  };
  useEffect(() => {
    if ("Notification" in window) {
      setEnableNoti(true);
    }
  }, []);

  useEffect(() => {
    displayIndexDb()
      .then((data) => {
        data.onsuccess = function () {
          // store the result of opening the database.
          setSchedules(data.result);
        };
      })
      .catch((error) => {
        throw new Error("Can't display data: " + error);
      });
  }, [schedules]);

  const onClickAddSchedule = async (
    appointment: string,
    value: string[],
    source: string,
    location: string
  ) => {
    addToIndexDB(appointment, currDate, value, source, location);
  };

  const scheduleElements = schedules?.map((event: any) => (
    <Schedule eventData={event} key={event.id} />
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
