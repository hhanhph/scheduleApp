import React from 'react'
import AnimateHeight from 'react-animate-height'
import TimeRangePicker from "@wojtekmaj/react-timerange-picker/dist/entry.nostyle";
import * as S from './styles'

const EditSection =({onClickAddSchedule}:any)=>{
    const [value, onChange] = React.useState(["10:00", "11:00"]);
    const [height, setHeight] = React.useState<number | string>(0);
    const [appointment, setAppointment] = React.useState("");
    const [source, setSource] = React.useState("");
    const toggle = () => {
        setHeight(height === 0 ? "auto" : 0);
      };

      const OnClickHandle=(appointment:string,value:string[],source:string)=>{
          console.log("heiiiiii: "+appointment+value+source)
          onClickAddSchedule(appointment,value,source)
          setAppointment("");
    setSource("");
      }

      const handleCapture = (target: HTMLInputElement) => {
        if (target.files) {
          if (target.files.length !== 0) {
            const file = target.files[0];
            const newUrl = URL.createObjectURL(file);
            setSource(newUrl);
            console.log("meo: " + source);
          }
        }
      };
    return(
<S.EditSection>
<S.EditButton
  aria-expanded={height !== 0}
  aria-controls="example-panel"
  onClick={toggle}
>
  {height === 0 ? "Plan new schedule" : "Close"}
</S.EditButton>

<AnimateHeight
  id="example-panel"
  duration={500}
  height={height}
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
    <S.Button onClick={()=>OnClickHandle(appointment,value,source)}>+</S.Button>
  </S.Edit>
</AnimateHeight>
</S.EditSection>)
}

export default EditSection