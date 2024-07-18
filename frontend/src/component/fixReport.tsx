import React from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch } from "@/redux/hook";
import {  editReport } from "@/redux/slices/reportSlice";
import { ReportClass, ReportStatus } from "@/classes/report";
interface ReportFoxDate {
  report: ReportClass|null;
  setReportData: React.Dispatch<React.SetStateAction<ReportClass | null>>;
}
const FixReport: React.FC<ReportFoxDate> = ({
  report,
  setReportData
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  

  const handleFixReport = () => {
    if (report) {
      dispatch(editReport({...report,handledBy:"6699632559fad484b8e3f19b",status:ReportStatus.InProcess})); 
      router.push("/"); 
    }
  };

  const handleReturnToMap = () => {
    setReportData(null);
  };

  if (!report) {
    return <Typography variant="h6">No report found</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Card>
        <CardMedia
          component="img"
          alt="Report Image"
          height="140"
          image={report.reportImage || "placeholder.jpg"}
          title="Report Image"
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
            style={{ marginTop: "0.5rem",marginRight:"4.rem"}}
            variant="body2"
            color="text.secondary"
            paragraph
          >
            Priority: {report.priority}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Status: {report.status}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CheckCircleIcon />}
            onClick={handleFixReport}
            style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}
          >
           will be handled by me
          </Button>
          <Button
            variant="contained"
            onClick={handleReturnToMap}
            style={{ marginTop: "0.5rem" }}
          >
            Return to Map
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FixReport;
