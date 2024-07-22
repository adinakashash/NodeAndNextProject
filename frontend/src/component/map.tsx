"use client";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import "../style/map.css";
import LocationDialog from "./locationVerification";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hook";
import { getReportByCity} from "@/redux/slices/reportSlice";
import { ReportClass, ReportType } from "@/classes/report";
import FixReport from "./fixReport";
import ViewingMyReports from './Viewing_my_reports';
import { WorkerClass } from "@/classes/worker";
import UserClass from "@/classes/user";
import { getWorkersById } from "@/redux/slices/workerSlice";
import { fetchUser } from "@/redux/slices/currentUserSlice";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
interface LatLng {
  lat: number;
  lng: number;
}

const Map: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  let user = useSelector((state: RootState) => state.cuurentuser.user); 
  if (user instanceof WorkerClass) {
    user = user.user;
  }
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const reports = useSelector((state: RootState) => state.reports.reports);
  const reportsArr: ReportClass[] = reports;
  console.log(user?.isWorker);
  useEffect(() => {
    dispatch(getReportByCity(user?.address));
  }, [dispatch, user?.address]);


  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLng>({
    lat: 31.771959,
    lng: 35.217018,
  });
  const [address, setAddress] = useState<string|undefined|null>("");
  const [userType, setUserType] = useState<string>("");
  if(user?.isWorker){
    setUserType("employee")
  }else{
    setUserType("user")
  }
  const [reportData, setReportData] = useState<ReportClass | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY ||
      "AIzaSyCkZB_Ga1JaDjV2A1lCELpfrGR9RnK4Gu4",
  });

  useEffect(() => {
    if (isLoaded && userType === "employee") {
      if (window.google) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { address: user?.address },
          (results, status) => {
            if (status === "OK" && results && results.length > 0) {
              setMapCenter({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              });
            } else {
              console.error(
                "Geocode was not successful for the following reason: " + status
              );
            }
          }
        );
      }
    }
  }, [isLoaded, userType, user?.address]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitgetReportByHandled = () => {
    router.push('/reportByHandled');
  };

  const handleAgreeLocationUser = () => {
    if (markerPosition) {
      const { lat, lng } = markerPosition;
      router.push(
        `/report?address=${encodeURIComponent(address)}&lat=${lat}&lng=${lng}`
      );
    }
    setOpen(false);
  };

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng && userType === "user") {
        const position: LatLng = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setMarkerPosition(position);
        getAddress(position);
        handleClickOpen();
      }
    },
    [userType]
  );

  const getAddress = (position: LatLng) => {
    if (window.google) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          setAddress(results[0].formatted_address);
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    }
  };

  const getUserLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPosition: LatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log("User location:", userPosition);
        setMarkerPosition(userPosition);
        setMapCenter(userPosition);
        getAddress(userPosition);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (isLoaded && userType === "user") {
      getUserLocation();
    }
  }, [isLoaded, getUserLocation, userType]);

  const filteredReports = reportsArr.filter(
    (report) =>
      report.reportType !== null &&
      user.typeEmployee.includes(report.reportType)
  );

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {!reportData ? (
        <>
          <GoogleMap
            mapContainerClassName="map-container"
            center={mapCenter}
            zoom={userType === "employee" ? 12 : 18}
            onClick={handleMapClick}
          >
            {markerPosition && (
              <Marker
                position={markerPosition}
                draggable={true}
                onDragEnd={(event: google.maps.MapMouseEvent) => {
                  if (event.latLng) {
                    const position: LatLng = {
                      lat: event.latLng.lat(),
                      lng: event.latLng.lng(),
                    };
                    setMarkerPosition(position);
                    setMapCenter(position);
                    getAddress(position);
                  }
                }}
              />
            )}
            {userType === "employee" &&
              filteredReports.length > 0 &&
              filteredReports.map((rep, index) => (
                <Marker
                  key={index}
                  position={{ lat: rep.location?.lat, lng: rep.location?.lng }}
                  icon={{
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.88-13.12h1.75v6.75h-1.75zm0 8.25h1.75v1.75h-1.75z"/></svg>`
                    )}`,
                    scaledSize: new google.maps.Size(30, 30),
                  }}
                  onClick={() => {
                    setReportData(rep);
                  }}
                />
              ))}
          </GoogleMap>
          {userType === "user" ? (
            <LocationDialog
              open={open}
              address={address}
              onClose={handleClose}
              onAgree={handleAgreeLocationUser}
            />
          ) : null}
          {address && <div className="address">Current Address: {address}</div>}
        </>
      ) : (
        <FixReport
          report={reportData}
          setReportData={setReportData}
          vieTheTask={false}
        />
      )}
      {/* {showViewingReports && <ViewingMyReports />} */}
      <button onClick={handleSubmitgetReportByHandled}>Viewing my reports</button>
    </div>
  );
};

export default Map;