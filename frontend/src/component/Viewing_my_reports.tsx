import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { getReportByHandled } from "@/redux/slices/reportSlice";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hook";
import { WorkerClass } from "@/classes/worker";
import UserClass from "@/classes/user";
import { Report, ReportClass, ReportType } from "@/classes/report";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FixReport from "./fixReport";

export default function ReportsDrawer() {
  const [open, setOpen] = React.useState(false);
  const [reportData, setReportData] = React.useState<ReportClass | null>(null);

  const dispatch = useAppDispatch();
  const reports = useSelector((state: RootState) => state.reports.reports);
  const reportsArr: ReportClass[] = reports;
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const user: UserClass = {
    firstName: "name",
    phone: "phone",
    email: "email",
    googleId: "123",
    displayName: "name",
    lastName: "name",
    image: "undefined",
    address: "undefined",
    isWorker: false
  };

  const worker: WorkerClass = {
    user: user,
    typeEmployee: [ReportType.Water],
    workerLocation: "ירושלים",
    workerID: "6699632559fad484b8e3f19b",
  };
  useEffect(() => {
    dispatch(getReportByHandled(worker.workerID));
  }, [dispatch]);

  if (reportData) {
    return (<FixReport report={reportData} setReportData={setReportData} vieTheTask={true} />
    )
  }

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {reportsArr.map((report, index) => (
          <ListItem key={index} disablePadding>

            <ListItemButton>
              <ListItemText primary={report.address} />
              <ListItemIcon onClick={() => setReportData(report)}>
                <ArrowForwardIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
