import React from "react";
import { Button } from "../EditSection/styles";
import dataURItoBlob from "./lib/utility";
import { storage } from "../EditSection/firebase";
import { addImgToIndexDb } from "../../../public/indexdb";
const ImageCapture = () => {
  const videoRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  var image;

  const captureImage = () => {
    canvasRef.current.style.display = "block";
    videoRef.current.style.display = "none";
    var context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      videoRef.current.videoHeight /
        (videoRef.current.videoWidth / canvasRef.current.width)
    );
    videoRef.current.srcObject?.getVideoTracks().forEach((track) => {
      track.stop();
    });
    videoRef.current.srcObject = null;
    image = dataURItoBlob(canvasRef.current.toDataURL());

    uploadFile(image);
    if(videoPlayer.srcObject){
      videoPlayer.srcObject.getVideoTracks.forEach(track=>{
        track.stop();
      })
    }
  };

  const uploadFile = async (blob) => {
    if('serviceWorker' in navigator && 'SyncManager' in window){
      navigator.serviceWorker.ready.then(sw=>{
        addImgToIndexDb(blob).then(()=>{
     
 sw.sync.register('sync-new');
 console.log("SyncManager available")
        })
     
      })
      //No Syncing available then just send the data to the server
    }else{
    var id = new Date().toISOString()
    const ref = await storage
      .ref(`/images/${id}`)
      .put(blob)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          console.log(" * new url", url);
        });
      });
  };
}
  React.useEffect(() => {
    if (!("mediaDevices" in navigator)) {
      navigator.mediaDevices = {};
    }
    if (!("getUserMedia" in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
          return Promise.reject(new Error("getUserMedia is not implemented"));
        }
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        video.style.display = "block";
        if (video) {
          video.srcObject = stream;
        }
      })
      .catch((err) => {
        inputRef.current.style.display = "block";
      });
  }, []);
  return (
    <div>
      <div width="50%" height="50%">
        <video autoPlay ref={videoRef} style={{ display: "none" }} />
        <canvas ref={canvasRef} width="100%" display="none" />
        <Button onClick={captureImage}>Take a photo</Button>
        <label htmlFor="file-upload">
          <i></i> Custom Upload
        </label>
        <input
          ref={inputRef}
          accept="image/*"
          id="file-upload"
          type="file"
          capture="environment"
          onChange={() => {}}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ImageCapture
