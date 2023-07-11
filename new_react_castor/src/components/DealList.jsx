import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam, mockBridgeTournamentData } from "../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { SpadeIcon, HeartIcon, DiamondIcon, ClubIcon } from "../utils/icons";

const DealsList = ({deals}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "Deal" },
    {
      field: "north",
      headerName: "North",
      width: 220,
      renderCell: ({ row: { north } }) => {
        return (
          <Box display="flex">
            <SpadeIcon sx={{width:"20px"}}/><Typography variant="h5">{north.spades}</Typography>
            <HeartIcon sx={{width:"20px"}}/><Typography variant="h5">{north.hearts}</Typography>
            <DiamondIcon sx={{width:"20px"}}/><Typography variant="h5">{north.diamonds}</Typography>
            <ClubIcon sx={{width:"20px"}}/><Typography variant="h5">{north.clubs}</Typography>
          </Box>
        )
      }
    },
    {
      field: "east",
      headerName: "East",
      width: 220,
      renderCell: ({ row: { east } }) => {
        return (
          <Box display="flex">
            <SpadeIcon sx={{width:"20px"}}/><Typography variant="h5">{east.spades}</Typography>
            <HeartIcon sx={{width:"20px"}}/><Typography variant="h5">{east.hearts}</Typography>
            <DiamondIcon sx={{width:"20px"}}/><Typography variant="h5">{east.diamonds}</Typography>
            <ClubIcon sx={{width:"20px"}}/><Typography variant="h5">{east.clubs}</Typography>
          </Box>
        )
      }
    },
    {
      field: "south",
      headerName: "South",
      width: 220,
      renderCell: ({ row: { south } }) => {
        return (
          <Box display="flex">
            <SpadeIcon sx={{width:"20px"}}/><Typography variant="h5">{south.spades}</Typography>
            <HeartIcon sx={{width:"20px"}}/><Typography variant="h5">{south.hearts}</Typography>
            <DiamondIcon sx={{width:"20px"}}/><Typography variant="h5">{south.diamonds}</Typography>
            <ClubIcon sx={{width:"20px"}}/><Typography variant="h5">{south.clubs}</Typography>
          </Box>
        )
      }
    },
    {
      field: "west",
      headerName: "West",
      width: 220,
      renderCell: ({ row: { west } }) => {
        return (
          <Box display="flex">
            <SpadeIcon sx={{width:"20px"}}/><Typography variant="h5">{west.spades}</Typography>
            <HeartIcon sx={{width:"20px"}}/><Typography variant="h5">{west.hearts}</Typography>
            <DiamondIcon sx={{width:"20px"}}/><Typography variant="h5">{west.diamonds}</Typography>
            <ClubIcon sx={{width:"20px"}}/><Typography variant="h5">{west.clubs}</Typography>
          </Box>
        )
      }
    },
  ];
  const rows = deals ? deals.map(entry => {
    const {deal, ...rest } = entry;
    return {...deal, ...rest}
  }) : [];

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="75vh"
        
        sx={{
          "width": `calc(100vw - 340px)`,
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default DealsList;