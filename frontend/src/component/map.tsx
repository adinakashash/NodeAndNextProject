import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import "../style/map.css";
import LocationDialog from "./locationVerification";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hook";
import { getReportByCity } from "@/redux/slices/reportSlice";
import { ReportClass } from "@/classes/report";

interface LatLng {
  lat: number;
  lng: number;
}

const Map: React.FC = () => {
  const reports = useSelector((state: RootState) => state.reports.reports);
  const reportsArr: ReportClass[] = Array(reports) || [];
  console.log(reportsArr);
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getReportByCity("ירושלים"));
  }, []);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLng>({
    lat: 18.5204,
    lng: 73.8567,
  });
  const [address, setAddress] = useState<string>("");
  const currentUser = "employee";
  const [reportData, setReportData] = useState<{
    location: LatLng;
    address: string;
  } | null>(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:
      process.env.REACT_APP_GOOGLE_API_KEY ||
      "AIzaSyCkZB_Ga1JaDjV2A1lCELpfrGR9RnK4Gu4",
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAgreeLocation = () => {
    if (markerPosition) {
      const { lat, lng } = markerPosition;
      router.push(
        `/report?address=${encodeURIComponent(address)}&lat=${lat}&lng=${lng}`
      );
    }
    setOpen(false);
  };

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const position: LatLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkerPosition(position);
      getAddress(position);
      handleClickOpen();
    }
  }, []);

  const getAddress = (position: LatLng) => {
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
    if (isLoaded) {
      getUserLocation();
    }
  }, [isLoaded, getUserLocation]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {currentUser === "employee" ? (
        <GoogleMap
          mapContainerClassName="map-container"
          center={mapCenter}
          zoom={15}
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
          {reportsArr.map((rep, index) => (
            <Marker
              key={index}
              position={{ lat: rep.location?.lat, lng: rep.location?.lng }}
              icon={{
                url: "https://mt.google.com/vt/icon/text=!&psize=19&font=fonts/arialuni_t.ttf&color=ff390000&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1",
              }}
              onClick={() => {
                console.log("location.address" + rep.address);
                setAddress(rep.address);
                setReportData({ location: rep.location, address: rep.address });
                handleClickOpen();
              }}
            />
          ))}
        </GoogleMap>
      ) : (
        <>
          <GoogleMap
            mapContainerClassName="map-container"
            center={mapCenter}
            zoom={18}
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
          </GoogleMap>
          <LocationDialog
            open={open}
            address={address}
            onClose={handleClose}
            onAgree={handleAgreeLocation}
          />
          {address && <div className="address">Current Address: {address}</div>}
          {reportData && (
            <div className="report">
              <h3>Event Details</h3>
              <p>Location: {reportData.address}</p>
              <p>
                Event:{" "}
                {
                  reportsArr.find((loc) => loc.address === reportData.address)
                    ?.status
                }
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Map;
