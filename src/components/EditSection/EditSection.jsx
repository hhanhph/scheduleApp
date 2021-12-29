import React from "react";
import AnimateHeight from "react-animate-height";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker/dist/entry.nostyle";
import ImageCapture from "../ImageCapture";
import { storage } from "./firebase";
import { addImgToIndexDb } from "../../../public/indexdb";
import { displayImgIndexDb, deleteImageIndexDb } from "../../../public/indexdb";
import * as S from "./styles";

const EditSection = ({ onClickAddSchedule }) => {
  const [value, onChange] = React.useState(["10:00", "11:00"]);
  const [height, setHeight] = React.useState(0);
  const [appointment, setAppointment] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [source, setSource] = React.useState("");
  const toggle = () => {
    setHeight(height === 0 ? "auto" : 0);
  };
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const OnClickHandle = (appointment, value, source) => {
    if (image) {
      //Background syncing
    //   if ("serviceWorker" in navigator && "SyncManager" in window) {
    //     getBase64(image)
    //       .then((data) => {
    //         navigator.serviceWorker.ready.then((sw) => {
    //           addImgToIndexDb(data).then(() => {
    //             sw.sync.register("sync-new");
    //             console.log("SyncManager available");
    //           });
    //         });
    //       })
    //       .catch((error) => {
    //         throw new Error("Can't convert image to Base64 " + error);
    //       });
    //   } else {
    //     const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    //     uploadTask.on(
    //       "state_changed",
    //       (snapshot) => {},
    //       (error) => {
    //         console.log(error);
    //       },
    //       () => {
    //         storage
    //           .ref("images")
    //           .child(image.name)
    //           .getDownloadURL()
    //           .then((url) => {
    //             console.log("DownloadURL: " + url);
    //             setImage(null);
    //             setSource(url);
    //             onClickAddSchedule(appointment, value, (source = url));
    //           });
    //         setSource("");
    //         setAppointment("");
    //       }
    //     );
    //   }
    // } else {
    //   onClickAddSchedule(appointment, value, "");
    //   setAppointment("");
    // }
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
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
  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const types = ["image/png", "image/jpeg", "image/gif"];

        if (types.every((type) => target.files[0].type !== type)) {
          throw new Error(
            `'${target.files[0].type}' is not a supported format`
          );
        }

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
        id="editBtn"
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
            onChange={(e) => setAppointment(e.currentTarget.value)}
          />
          <TimeRangePicker
            disableClock={true}
            onChange={onChange}
            value={value}
          />
          <ImageCapture newImg={handleCapture} />
          <S.Button id="submitBtn" onClick={() => OnClickHandle(appointment, value, source)}>
            +
          </S.Button>
        </S.Edit>
      </AnimateHeight>
    </S.EditSection>
  );
};

export default EditSection;
