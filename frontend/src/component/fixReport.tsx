import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch } from "@/redux/hook";
import { deleteReport, editReport } from "@/redux/slices/reportSlice";
import { ReportClass, ReportStatus } from "@/classes/report";
import CommentIcon from "@mui/icons-material/Comment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Chat from "./chat";
interface ReportFoxDate {
  vieTheTask: boolean;
  report: ReportClass | null;
  setReportData: React.Dispatch<React.SetStateAction<ReportClass | null>>;
}

const FixReport: React.FC<ReportFoxDate> = ({
  report,
  setReportData,
  vieTheTask,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [chat, setChat] = useState<boolean>(false);
  const handleFixReport = () => {
    if (report) {
      dispatch(deleteReport(report._id));
      router.push("/");
    }
  };
  const chatWithTheReporter = () => {
    setChat(true);
  };
  const handleEditReport = () => {
    if (report) {
      dispatch(
        editReport({
          ...report,
          handledBy: "6699632559fad484b8e3f19b",
          status: ReportStatus.InProcess,
        })
      );
      router.push("/");
    }
  };

  const handleReturnToMap = () => {
    setReportData(null);
  };

  if (!report) {
    return <Typography variant="h6">No report found</Typography>;
  }
  if (chat) {
    return <Chat reportId={"669c58c3e5e1e99ddc8925dc"}/>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Card>
        <img
          alt="Report Image"
          height="140"
          src={report.reportImage || "/placeholder.jpg"}
          style={{ width: "100%", height: "auto" }}
        />
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {report.address}
          </Typography>
          <Accordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="body2" color="text.secondary">
                Description
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {report.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Typography
            style={{ marginTop: "0.5rem", marginRight: "4rem" }}
            variant="body2"
            color="text.secondary"
            paragraph
          >
            Priority: {report.priority}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Status: {report.status}
          </Typography>
          {!vieTheTask ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckCircleIcon />}
              onClick={handleEditReport}
              style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}
            >
              Will be handled by me
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckCircleIcon />}
              onClick={handleFixReport}
              style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}
            >
              Report as complete
            </Button>
          )}
          <br />
          <Button
            variant="contained"
            onClick={handleReturnToMap}
            startIcon={<LocationOnIcon />}
            style={{ marginTop: "0.5rem" }}
          >
            Return to Map
          </Button>
          <br />
          <Button
            variant="contained"
            color="primary"
            startIcon={<CommentIcon />}
            onClick={chatWithTheReporter}
            style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}
          >
            Chat with the reporter
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FixReport;
