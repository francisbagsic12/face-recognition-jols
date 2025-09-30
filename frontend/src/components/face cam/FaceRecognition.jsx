import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useFaceDetection } from "react-use-face-detection/build/index.js";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import * as faceapi from "face-api.js";
import "../face cam/camera.css";
import Card from "../id verify card/Card";
import { createContext } from "react";
export const personInfo = createContext("1");
const width = 950;
const height = 800;
const FaceRecognition = () => {
  const { webcamRef, facesDetected } = useFaceDetection({
    faceDetectionOptions: {
      model: "short",
      maxResults: 2,
      minConfidence: 0.5,
      numThreads: 4,
      enableWebcamMirroring: true,
      minFaceSize: 100,
      detectionInterval: 100,
      maxFaces: 2,
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }) =>
      new Camera(mediaSrc, {
        onFrame,
        width,
        height,
      }),
  });
  const [lastVerifiedPerson, setLastVerifiedPerson] = useState(null);
  const [boundingBoxes, setBoundingBoxes] = useState([]);
  const [isverified, SetIsVerified] = useState("red");
  const faceMatcherRef = useRef(null);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [personId, SetPersonId] = useState([]);
  const [verifiedFace, SetVerifiedFace] = useState([]);
  const [faceImages, setFaceImages] = useState({});
  const [lastVerifiedFace, setLastVerifiedFace] = useState(null);
  const [confidenceThreshold] = useState(0.5);
  const [updateDelay] = useState(500); // 500ms delay ;
  const [timeIn, setTimeIn] = useState(null);
  const [timeOut, setTimeOut] = useState(null);
  const [canTimeOut, setCanTimeOut] = useState(false);
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

        const labeledFaceDescriptors = await Promise.all(
          [
            {
              label: "francis bagsic", // Ensure label is a string
              description: await faceapi.fetchImage(
                "https://ik.imagekit.io/deei2sz6k/WIN_20250326_00_51_27_Pro.jpg?updatedAt=1747906538585"
              ),
              image:
                "https://ik.imagekit.io/deei2sz6k/WIN_20250326_00_51_27_Pro.jpg?updatedAt=1747906538585",
              type: "student",
              section: "grade 7 skulbukol",
            },

            {
              label: "christine leila molina", // Ensure label is a string
              description: await faceapi.fetchImage(
                "https://ik.imagekit.io/deei2sz6k/WIN_20250522_17_37_20_Pro.jpg?updatedAt=1747906669253"
              ),
              image:
                "https://ik.imagekit.io/deei2sz6k/WIN_20250522_17_37_20_Pro.jpg?updatedAt=1747906669253",
              type: "visitor",
            },
          ].map(async ({ label, description, image, type, section }) => {
            const detections = await faceapi
              .detectSingleFace(description)
              .withFaceLandmarks()
              .withFaceDescriptor();

            if (!detections) {
              throw new Error(
                `No face detected in the image for label: ${label}`
              );
            }
            setFaceImages((prevImages) => ({
              ...prevImages,
              [label]: { image, type, section },
            }));

            return new faceapi.LabeledFaceDescriptors(label, [
              detections.descriptor,
            ]);
          })
        );

        faceMatcherRef.current = new faceapi.FaceMatcher(
          labeledFaceDescriptors,
          0.5
        );
        SetPersonId(
          faceMatcherRef.current._labeledDescriptors.map(
            (LabeledFaceDescriptors2) => LabeledFaceDescriptors2._label
          )
        );

        console.log("Models and labeled faces loaded successfully");
        setModelsLoaded(true); // Set models as loaded
      } catch (error) {
        console.error("Error loading models or labeled faces:", error);
      }
    };

    loadModels();
  }, []);
  const detectFace = async () => {
    if (webcamRef.current && faceMatcherRef.current && modelsLoaded) {
      const video = webcamRef.current.video;
      if (video && video.readyState === 4) {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        context.drawImage(video, 0, 0, width, height);

        try {
          const detections = await faceapi
            .detectAllFaces(canvas)
            .withFaceLandmarks()
            .withFaceDescriptors();

          if (detections.length > 0) {
            const faces = detections.map((detection) => {
              const bestMatch = faceMatcherRef.current.findBestMatch(
                detection.descriptor
              );

              return {
                box: detection.detection.box,
                label: bestMatch.label,
                distance: bestMatch.distance,
                isVerified:
                  personId.includes(bestMatch.label) &&
                  bestMatch.distance < confidenceThreshold,
              };
            });

            const verifiedFaces = faces.filter((face) => face.isVerified);
            if (detections.length > 1) {
              setVerificationStatus(
                "The camera can detect only one face per scan"
              );
              SetIsVerified("transparent");
              setLastVerifiedPerson(null);
              setLastVerifiedFace(null);
            } else if (verifiedFaces.length === 1) {
              const verifiedPerson = verifiedFaces[0].label;
              const verifiedImage = faceImages[verifiedPerson];

              // Only update if there's a significant change
              if (
                lastVerifiedFace === null ||
                lastVerifiedFace.label !== verifiedPerson ||
                lastVerifiedFace.distance !== verifiedFaces[0].distance
              ) {
                debounce(() => {
                  setLastVerifiedPerson(verifiedPerson);
                  setVerificationStatus(`${verifiedPerson}`);
                  SetVerifiedFace(verifiedImage);
                  SetIsVerified("green");
                  setLastVerifiedFace(verifiedFaces[0]);

                  // Handle time in and time out
                  const currentTime = new Date();
                  if (!timeIn) {
                    setTimeIn(currentTime);
                    // Enable time out after 1 minute
                    setTimeout(() => setCanTimeOut(true), 60000);
                  } else if (canTimeOut && !timeOut) {
                    setTimeOut(currentTime);
                  }
                }, updateDelay)();
              }
            } else {
              setVerificationStatus("Person not verified");
              SetIsVerified("red");
              SetVerifiedFace(null);
              setLastVerifiedFace(null);
              setLastVerifiedPerson("");
              SetVerifiedFace("");
            }

            setBoundingBoxes(
              faces.map((face) => ({
                xCenter: face.box.x / width,
                yCenter: face.box.y / height,
                width: face.box.width / width,
                height: face.box.height / height,
                isVerified: face.isVerified,
              }))
            );
          } else {
            setVerificationStatus("No face detected");
            SetIsVerified("red");
            setBoundingBoxes([]);
            setLastVerifiedFace(null);
          }
        } catch (error) {
          console.error("Error detecting face:", error);
          setVerificationStatus("Error detecting face");
          setBoundingBoxes([]);
          setLastVerifiedFace(null);
        }
      }
    }
  };
  useEffect(() => {
    const interval = setInterval(detectFace, 100);
    return () => clearInterval(interval);
  }, [webcamRef, modelsLoaded, personId, facesDetected, lastVerifiedFace]);
  return (
    <section id="camera-section">
      {/* <div>Face recognition register ,mossinnngg!!!!</div>
      <RegisterForm /> */}
      {!modelsLoaded ? (
        <>
          <section
            className="container-fluid"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              height: "100vh",
            }}
          >
            <div class="loader">
              <div class="loader__balls">
                <div class="loader__balls__group">
                  <div class="ball item1"></div>
                  <div class="ball item1"></div>
                  <div class="ball item1"></div>
                </div>
                <div class="loader__balls__group">
                  <div class="ball item2"></div>
                  <div class="ball item2"></div>
                  <div class="ball item2"></div>
                </div>
                <div class="loader__balls__group">
                  <div class="ball item3"></div>
                  <div class="ball item3"></div>
                  <div class="ball item3"></div>
                </div>
              </div>
            </div>
            <h1 className="mt-4">Loading models...</h1>
          </section>
        </>
      ) : (
        <>
          <div id="camera">
            <div style={{ width, height, position: "relative" }}>
              {boundingBoxes.map((box, index) => (
                <div
                  key={index}
                  style={{
                    border: `4px solid ${isverified}`,
                    position: "absolute",

                    top: `${box.yCenter * 100}%`,
                    left: `${box.xCenter * 100}%`,
                    width: `${box.width * 100}%`,
                    height: `${box.height * 100}%`,
                    zIndex: 1,
                  }}
                />
              ))}
              <Webcam
                ref={webcamRef}
                forceScreenshotSourceSize
                width={width}
                height={height}
                style={{
                  position: "absolute",
                }}
              />{" "}
            </div>{" "}
            <div id="verifyLabel">
              <span id="verification-status"> Verification Status: </span>{" "}
              <span id="verify-text" className="text-left">
                {" "}
                {verificationStatus}
              </span>
            </div>
          </div>
          <personInfo.Provider
            value={{
              name: lastVerifiedPerson,
              imahe: verifiedFace?.image,
              type: verifiedFace?.type,
              section: verifiedFace?.section,
              timeIn: timeIn,
              timeOut: timeOut,
              canTimeOut: canTimeOut,
            }}
          >
            <Card />
          </personInfo.Provider>
        </>
      )}
    </section>
  );
};

export default FaceRecognition;
