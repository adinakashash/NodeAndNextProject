import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import "../style/map.css";
import LocationDialog from "./locationVerification";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hook";
import { getReportByCity } from "@/redux/slices/reportSlice";
import { ReportClass, ReportType } from "@/classes/report";
import FixReport from "./fixReport";
import { WorkerClass } from "@/classes/worker";
import UserClass from "@/classes/user";

interface LatLng {
  lat: number;
  lng: number;
}

const Map: React.FC = () => {
  const dispatch = useAppDispatch();
  const reports = useSelector((state: RootState) => state.reports.reports);
  const reportsArr: ReportClass[] = reports;

  const user: UserClass = {
    firstName: "name",
    phone: "phone",
    email: "email",
    googleId: "123",
    displayName: "name",
    lastName: "name",
    image: "undefined",
    address: "undefined",
  };

  const worker: WorkerClass = {
    user: user,
    typeEmployee: [ReportType.Pavement],
    workerLocation: "ירושלים",
    workerID: "string",
  };

  useEffect(() => {
    dispatch(getReportByCity(worker.workerLocation));
  }, [dispatch, worker.workerLocation]);

  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLng>({
    lat: 31.771959,
    lng: 35.217018,
  });
  const [address, setAddress] = useState<string>("");
  const [userType, setUserType] = useState<string>("employee");
  const [reportData, setReportData] = useState<ReportClass | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "AIzaSyCkZB_Ga1JaDjV2A1lCELpfrGR9RnK4Gu4",
  });

  useEffect(() => {
    if (isLoaded && userType === "employee") {
      if (window.google) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: worker.workerLocation }, (results, status) => {
          if (status === "OK" && results && results.length > 0) {
            setMapCenter({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            });
          } else {
            console.error("Geocode was not successful for the following reason: " + status);
          }
        });
      }
    }
  }, [isLoaded, userType, worker.workerLocation]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAgreeLocationUser = () => {
    if (markerPosition) {
      const { lat, lng } = markerPosition;
      router.push(`/report?address=${encodeURIComponent(address)}&lat=${lat}&lng=${lng}`);
    }
    setOpen(false);
  };

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng && userType === "user") {
      const position: LatLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkerPosition(position);
      getAddress(position);
      handleClickOpen();
    }
  }, [userType]);

  const getAddress = (position: LatLng) => {
    if (window.google) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          setAddress(results[0].formatted_address);
        } else {
          console.error("Geocode was not successful for the following reason: " + status);
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
    (report) => report.reportType !== null && worker.typeEmployee.includes(report.reportType)
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
                    url: "https://mt.google.com/vt/icon/text=!&psize=19&font=fonts/arialuni_t.ttf&color=ff390000&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1",
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
          ) : (      
            null 
          )}
          {address && <div className="address">Current Address: {address}</div>}
        </>
      ) : (
        <FixReport report={reportData} setReportData={setReportData} />
      )}
    </div>
  );
};

export default Map;
