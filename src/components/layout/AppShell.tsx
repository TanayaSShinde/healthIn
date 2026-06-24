import { type ReactNode, useState } from "react";
import { Box, Container, Toolbar } from "@mui/material";
import { Sidebar, drawerWidth } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ bgcolor: "background.default", display: "flex", minHeight: "100vh" }}>
      <TopNavbar onMenuClick={() => setMobileOpen(true)} />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />
        <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 } }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
