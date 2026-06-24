import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import { navigationItems } from "../../shared/navigation";

export const drawerWidth = 260;

type SidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

function SidebarContent() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />

      <Box sx={{ px: 3, py: 2 }}>
        <Typography color="text.secondary" sx={{ fontSize: "0.75rem", fontWeight: 800 }}>
          MAIN MENU
        </Typography>
      </Box>

      <List disablePadding>
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const selected = index === 0;

          return (
            <ListItem disablePadding key={item.label}>
              <ListItemButton
                selected={selected}
                sx={{
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "& .MuiListItemIcon-root": {
                      color: "primary.contrastText",
                    },
                  },
                  "&.Mui-selected:hover": {
                    bgcolor: "primary.dark",
                  },
                  minHeight: 48,
                }}
              >
                <ListItemIcon sx={{ color: selected ? "inherit" : "primary.main", minWidth: 42 }}>
                  <Icon />
                </ListItemIcon>
                <Typography sx={{ fontWeight: selected ? 800 : 700 }}>{item.label}</Typography>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ px: 3, py: 2.5 }}>
        <Typography color="text.secondary" sx={{ fontSize: "0.82rem" }}>
          Care operations workspace
        </Typography>
      </Box>
    </Box>
  );
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: { md: drawerWidth } }}>
      <Drawer
        ModalProps={{ keepMounted: true }}
        onClose={onClose}
        open={mobileOpen}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            borderRight: "1px solid rgba(21, 101, 192, 0.12)",
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        variant="temporary"
      >
        <SidebarContent />
      </Drawer>

      <Drawer
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            borderRight: "1px solid rgba(21, 101, 192, 0.12)",
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        variant="permanent"
      >
        <SidebarContent />
      </Drawer>
    </Box>
  );
}
