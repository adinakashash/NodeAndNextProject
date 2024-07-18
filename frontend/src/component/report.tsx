import React, { useState,useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/system/Box";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useAppDispatch } from "@/redux/hook";
import {
  ReportClass,
  ReportStatus,
  ReportPriority,
  ReportType,
  LatLng,
} from "@/classes/report";
import { addReport } from "@/redux/slices/reportSlice";
import User from "@/classes/user";
import { useRouter, useSearchParams } from 'next/navigation';
import UserClass from "@/classes/user";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Report: React.FC = (props:any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
 
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issueType, setIssueType] = useState<ReportType|null>(null);
  const [details, setDetails] = useState("");
  const [reportFile, setReportFile] = useState<string>('');
  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));


  const issueTypes = [
    "crash",
    "water",
    "trash",
    "electricity",
    "pavement",
    "street light",
    "traffic light",
    "sewage",
    "tree",
    "sign",
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setReportFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const user: UserClass = {
      firstName: name,
      phone: phone,
      enail: email,
      googleId: "123",
      displayName: name,
      lastName: name,
      image: "undefined",
      adderss: "undefined"
    };
    const location: LatLng = {
       lat, 
       lng, 
    };
    const report = new ReportClass(
      details,
      user,
      "",
      ReportStatus.Pending,
      ReportPriority.Medium,
      reportFile,
      location,
      issueType,
      address
    );

    dispatch(addReport(report));
    router.push("/");
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
        padding: 2,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          width: 400,
          padding: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <TextField
          id="standard-read-only-input"
          label="Location"
          value={address}
          InputProps={{
            readOnly: true,
          }}   
          variant="standard"
        />
        <TextField
          id="phone-input"
          label="Phone"
          type="tel"
          variant="standard"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          id="name-input"
          label="Full name"
          type="text"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="email-input"
          label="Email"
          type="email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Autocomplete
          id="issue-type"
          options={issueTypes}
          value={issueType}
          onChange={(event, newValue) => {
            setIssueType(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="type" variant="standard" />
          )}
        />
        <TextField
          id="issue-details"
          label="Fault details"
          multiline
          rows={4}
          variant="standard"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload image
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>
          <IconButton color="primary" onClick={handleHomeClick}>
            <HomeIcon />
          </IconButton>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          mt={2}
        >
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            send
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setPhone("");
              setName("");
              setEmail("");
              setIssueType(null);
              setDetails("");
            }}
          >
            clean
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Report;
