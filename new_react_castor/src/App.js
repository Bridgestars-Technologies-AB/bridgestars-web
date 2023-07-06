import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Pie from "./scenes/pie";
import BridgeEditor from "./scenes/bridge/editor";
import ContractScorer from "./scenes/bridge/scorer";
import Simulator from "./scenes/bridge/simulator";
import Results from "./scenes/results";
import { mockBridgeTournamentData } from "./data/mockData";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <Topbar />
          <main className="content" style={{paddingTop:"80px"}}>
            <div style={{display:"flex"}}>
              <div style={{marginLeft:"280px"}}/>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/bridge/editor" element={<BridgeEditor />} />
                <Route path="/bridge/contract-scorer" element={<ContractScorer />} />
                <Route path="/bridge/simulator" element={<Simulator />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/team" element={<Results deals={mockBridgeTournamentData} />} />
              </Routes>
            </div>
            
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
