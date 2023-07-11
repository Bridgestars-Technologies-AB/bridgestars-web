import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam, mockBridgeTournamentData } from "../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { SpadeIcon, HeartIcon, DiamondIcon, ClubIcon } from "../utils/icons";


const ResultList = ({results}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "Deal", width: 100 },
    { field: "contract", headerName: "Contract", width: 100, 
      renderCell: ({ row: { result } }) => {
        const contract = result.contract;
        const suitIcon = contract.suit === "S" ? <SpadeIcon sx={{width:"20px"}}/> : contract.suit === "H" ? <HeartIcon sx={{width:"20px"}}/> : contract.suit === "D" ? <DiamondIcon sx={{width:"20px"}}/> : <ClubIcon sx={{width:"20px"}}/>;
        const declarer = contract.declarer === "N" ? "North" : contract.declarer === "E" ? "East" : contract.declarer === "S" ? "South" : "West";
        return (
          <Box display="flex">
            <Typography variant="h5">{contract.level}</Typography>
            <Box ml="3px" mr="5px">{suitIcon}</Box>
            <Typography variant="h5">{declarer}</Typography>
          </Box>
        )
       }
    },
    { field: "lead", headerName: "Lead", width: 100, renderCell: ({ row: { result } }) => {
        const lead = result.lead;
        const suitIcon = lead.suit === "S" ? <SpadeIcon sx={{width:"20px"}}/> : lead.suit === "H" ? <HeartIcon sx={{width:"20px"}}/> : lead.suit === "D" ? <DiamondIcon sx={{width:"20px"}}/> : <ClubIcon sx={{width:"20px"}}/>;
        return (
          <Box display="flex">
            <Box ml="3px" mr="5px">{suitIcon}</Box>
            <Typography variant="h5">{lead.rank}</Typography>
          </Box>
        )
     }
    },
    { field: "result", headerName: "Result", width: 100, renderCell: ({ row: { result } }) => {
        const contract = result.contract;
        const tricks = result.tricks;
        const overtricks = tricks - contract.level - 6;
        return (
          <Box display="flex">
            <Typography variant="h4">{overtricks == 0 ? "=" : overtricks > 0 ? "+" + overtricks : overtricks}</Typography>
          </Box>
        )
     }
    },
    { field: "ns", headerName: "N - S", width: 200, 
        renderCell: ({ row: { players } }) => {
            return (
                <Box display="flex">
                    <Typography variant="h5">{players.north} - {players.south}</Typography>
                </Box>
            )
        } 
    },
    { field: "ew", headerName: "E - W", width: 200, 
        renderCell: ({ row: { players } }) => {
            return (
                <Box display="flex">
                    <Typography variant="h5">{players.east} - {players.west}</Typography>
                </Box>
            )
        }
    },
  ];
  const rows = results;

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
}

export default ResultList;