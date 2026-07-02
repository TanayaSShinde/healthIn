import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { healthPulse, reducedMotionQuery } from "../../theme/animations";

type TopNavbarProps = {
  onMenuClick: () => void;
};

export function TopNavbar({ onMenuClick }: TopNavbarProps) {
  return (
    <AppBar
      color="primary"
      elevation={0}
      position="fixed"
      sx={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, md: 72 },
          px: { xs: 2, md: 3 },
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <IconButton
            aria-label="Open navigation"
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ display: { md: "none" } }}
          >
            <MenuRoundedIcon />
          </IconButton>

          <Box
            aria-hidden="true"
            sx={{
              alignItems: "center",
              animation: `${healthPulse} 2600ms ease-in-out infinite`,
              bgcolor: "rgba(255, 255, 255, 0.18)",
              border: "1px solid rgba(255, 255, 255, 0.28)",
              borderRadius: 2,
              display: { xs: "none", sm: "flex" },
              height: 40,
              justifyContent: "center",
              width: 40,
              [reducedMotionQuery]: {
                animation: "none",
              },
            }}
          >
            <Typography component="span" sx={{ fontWeight: 800 }}>
              H
            </Typography>
          </Box>

          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "1.2rem", md: "1.45rem" },
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            HealthIn
          </Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box sx={{ display: { xs: "none", sm: "block" }, textAlign: "right" }}>
            <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Dr. Anjum Pathan
            </Typography>
            <Typography color="rgba(255, 255, 255, 0.76)" sx={{ fontSize: "0.82rem" }}>
              BHMS MD (Hom) | 10+ Years Experience
            </Typography>
          </Box>

          <Avatar
            alt="Dr. Anjum Pathan"
            sx={{
              bgcolor: "#e3f2fd",
              color: "primary.dark",
              fontWeight: 800,
              height: 42,
              width: 42,
            }}
          >
            AP
          </Avatar>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
