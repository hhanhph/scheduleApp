import React from "react";
import AnimateHeight from "react-animate-height";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker/dist/entry.nostyle";
import ImageCapture from "../ImageCapture";
import { storage } from "./firebase";
import * as S from "./styles";

const EditSection = ({ onClickAddSchedule }) => {
  const [value, onChange] = React.useState(["10:00", "11:00"]);
  const [height, setHeight] = React.useState(0);
  const [appointment, setAppointment] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [source, setSource] = React.useState("");
  const [location, setLocation] = React.useState("");
  const geoRef = React.useRef();
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
  const OnClickHandle = (appointment, value, source, location) => {
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
              onClickAddSchedule(appointment, value, (source = url), location);
            });
          setSource("");
          setAppointment("");
          setLocation("");
        }
      );
    } else {
      onClickAddSchedule(appointment, value, "");
      setAppointment("");
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

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        geoRef.current.style.display = "none";
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`
        )
          .then((res) => res.json())
          .then((data) => setLocation(data.display_name));
      },
      (err) => {
        console.log("Error on getting the current position: " + err);
        geoRef.current.style.display = "inline";
        alert(
          "The current position couldn't be detected, please insert position manually"
        );
      },
      { timeout: 3000 }
    );
  };
  React.useEffect(() => {
    if (!("geolocation" in navigator)) {
      geoRef.current.display = "none";
    }
  }, [source]);
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
          <S.Button
            ref={geoRef}
            id="geoLocationBtn"
            onClick={getCurrentPosition}
          >
            Get current location
          </S.Button>
          {location && <S.LocationInput>Location: {location}</S.LocationInput>}
          <S.Button
            id="submitBtn"
            onClick={() => OnClickHandle(appointment, value, source, location)}
          >
            +
          </S.Button>
        </S.Edit>
      </AnimateHeight>
    </S.EditSection>
  );
};

export default EditSection;
