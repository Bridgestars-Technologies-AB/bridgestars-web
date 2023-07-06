import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam, mockBridgeTournamentData } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { SpadeIcon, HeartIcon, DiamondIcon, ClubIcon } from "../../utils/icons";
import DealsList from "../../components/DealList";
import ResultList from "../../components/ResultList";

const Results = () => {
  return (
    <Box>
      <DealsList deals={mockBridgeTournamentData}></DealsList>
      <ResultList results={mockBridgeTournamentData}></ResultList>
    </Box>
  )
};

export default Results;