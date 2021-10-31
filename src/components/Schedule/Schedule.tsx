import { gql } from "@apollo/client";
import { useAppointmentQuery,useDeleteScheduleMutation,useUpdateScheduleMutation} from "../../graphql/types";
import { useState,ChangeEvent, useEffect } from "react";
import debounce from 'lodash.debounce'
import * as S from './styles'

interface Props {
  scheduleId: string;
}


gql`
  query Appointment($scheduleId: ID!) {
    Appointment(scheduleId: $scheduleId) {
      title
      scheduleDate
    }
  }

  mutation DeleteSchedule($scheduleId: ID!){
    deleteSchedule(scheduleId: $scheduleId){
      title
scheduleDate
    }
  }

  mutation UpdateSchedule($scheduleId: ID!, $data: UpdateScheduleInput!) {
    updateSchedule(scheduleId: $scheduleId, data: $data) {
      title
    }
  }

`;

const Schedule = (props: Props) => {
  const { scheduleId } = props;
  const { loading, data } = useAppointmentQuery({
    variables: {
      scheduleId,
    },
  });
  const [deleteSchedule]=useDeleteScheduleMutation()
  const[updateSchedule]=useUpdateScheduleMutation()
  const [input,setInput]=useState("")
const [isEditing,setIsEditing] = useState(false)
  const onDelete=()=>{
   
      deleteSchedule({
        variables: {
          scheduleId
        },
      });
    
      window.location.reload()
    };

    const onInputChange=(e:ChangeEvent)=>{
      let target = e.target as HTMLInputElement
setInput(target.value)
    }
  let content = <h1>Loading....</h1>

  if(!loading&& data?.Appointment){
    const newTitle= String(data?.Appointment?.title)
  content=(
  <>{newTitle}</>
  )
}
useEffect(() => {
  setInput(data?.Appointment?.title||'');
}, [data?.Appointment?.title]);
  return <S.Element>{isEditing?<S.Input placeholder={data?.Appointment?.title} onChange={onInputChange}></S.Input>:<S.Content>{content}</S.Content>}
<S.Button onClick={onDelete}>Delete</S.Button><S.Button onClick={() => {
    
    
    if(isEditing===true){
      updateSchedule({
        variables: {
          scheduleId,
          data: {
            title:input
          },
        },
      });
      window.location.reload()
    }
    setIsEditing(!isEditing)
  }
}>{isEditing?'Save':'Edit'}</S.Button></S.Element>
};

export default Schedule;