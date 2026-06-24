import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppShell } from "./components/layout/AppShell";
import { DashboardHome } from "./features/dashboard/DashboardHome";
import { appTheme } from "./theme/appTheme";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AppShell>
        <DashboardHome />
      </AppShell>
    </ThemeProvider>
  );
}

export default App;
