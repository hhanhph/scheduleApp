import React from "react";
import { Button } from "../EditSection/styles";
import dataURItoBlob from "./lib/utility";
import * as S from './styles'
const ImageCapture = ({newImg}) => {
  const videoRef = React.useRef(null);
  const imgCaptureRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  var image;
let video = videoRef.current;
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
  
  };


  // const capture=async()=>{
  //   console.log("capture:"+useFront)
  //   navigator.mediaDevices
  //   .getUserMedia( {audio: false, video: true,facingMode: useFront ? 'user' : 'environment'} )
  //   .then((_stream) => {
      
  //     video.style.display = "block";
  //     if (video) {
  //       stream =_stream
  //       video.srcObject = stream;
  //       video.play();
  //     }
  //   })
  //   .catch((err) => {
  //     imgCaptureRef.current.style.display = "none";
  //   });
  //}
  // const switchCam =()=>{
  //   // we need to flip, stop everything
  //   console.log("Stream"+stream)
  //   videoRef.current.pause()
  //   videoRef.current.srcObject?.getVideoTracks().forEach((track) => {
  //     track.stop();
  //   });
  //   videoRef.current.srcObject = null;
  //  useFront=!useFront
  //  console.log("front:"+useFront)
  //   // toggle / flip
  //   console.log("At switching position")
  //   capture();
  // }

  const onChange=(target)=>{
      if (target.files.length !== 0) {
//no sync
newImg(target=target)
  
        } 
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
  
  },[]);

  return (
   <S.ImgBtn className='button'>
      <S.UploadLabel htmlFor='single'>
        Upload Image
      </S.UploadLabel>
        <S.ImgInput type='file' id='single' accept='images/*' onChange={(e)=>onChange(e.target)} /> 
        </S.ImgBtn>
);
};

export default ImageCapture;
