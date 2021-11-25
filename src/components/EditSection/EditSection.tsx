import React from "react";
import AnimateHeight from "react-animate-height";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker/dist/entry.nostyle";
import { storage } from "./firebase";
import * as S from "./styles";
import { set } from "mongoose";

const EditSection = ({ onClickAddSchedule }: any) => {
  const [value, onChange] = React.useState(["10:00", "11:00"]);
  const [height, setHeight] = React.useState<number | string>(0);
  const [appointment, setAppointment] = React.useState("");
  const [image, setImage] = React.useState<File | null>();
  const [source, setSource] = React.useState("");
  const toggle = () => {
    setHeight(height === 0 ? "auto" : 0);
  };

  const OnClickHandle = (
    appointment: string,
    value: string[],
    source: string
  ) => {
    if (image) {
      const uploadTask = storage.ref(`/images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot: any) => {},
        (error: any) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url: string) => {
              console.log("DownloadURL: " + url);
              setImage(null);
              setSource(url);
              onClickAddSchedule(appointment, value, source=url);
            });
            setSource('')
            setAppointment('')
        }
      );
    }
    else{
      onClickAddSchedule(appointment, value, '')
      setAppointment('')
    }
  };

  const handleCapture = (target: HTMLInputElement) => {
    if (target.files) {
      if (target.files.length !== 0) {
        setImage(target.files[0]);
      }
    }
  };

  React.useEffect(() => {}, [source]);
  return (
    <S.EditSection>
      <S.EditButton
        aria-expanded={height !== 0}
        aria-controls="example-panel"
        onClick={toggle}
      >
        {height === 0 ? "Plan new schedule" : "Close"}
      </S.EditButton>

      <AnimateHeight id="example-panel" duration={500} height={height}>
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
          <S.Button onClick={() => OnClickHandle(appointment, value, source)}>
            +
          </S.Button>
        </S.Edit>
      </AnimateHeight>
    </S.EditSection>
  );
};

export default EditSection;
