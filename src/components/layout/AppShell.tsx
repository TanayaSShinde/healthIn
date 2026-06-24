import { type ReactNode, useState } from "react";
import { Box, Container, Toolbar } from "@mui/material";
import { Sidebar, drawerWidth } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import type { PageId } from "../../shared/navigation";

type AppShellProps = {
  children: ReactNode;
  onNavigate: (pageId: PageId) => void;
  selectedPage: PageId;
};

export function AppShell({ children, onNavigate, selectedPage }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileOpen(false);
  };

  return (
    <Box sx={{ bgcolor: "background.default", display: "flex", minHeight: "100vh" }}>
      <TopNavbar onMenuClick={() => setMobileOpen(true)} />
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigate={handleNavigate}
        selectedPage={selectedPage}
      />

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
