import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { AnimatedNumber } from "../../components/common/AnimatedNumber";
import { ecgTrace, entranceSx, healthPulse, hoverLiftSx, reducedMotionQuery } from "../../theme/animations";

const statCards = [
  {
    label: "Active Patients",
    value: 1248,
    helper: "126 added this month",
    icon: LocalHospitalRoundedIcon,
  },
  {
    label: "Pending Followups",
    value: 84,
    helper: "18 due today",
    icon: AccessTimeRoundedIcon,
  },
  {
    label: "Completed Visits",
    value: 318,
    helper: "This week",
    icon: CheckCircleRoundedIcon,
  },
];

const appointments = [
  {
    patient: "Anika Rao",
    time: "09:30 AM",
    type: "Diabetes review",
    status: "Confirmed",
  },
  {
    patient: "Rahul Mehta",
    time: "11:00 AM",
    type: "Post-op check",
    status: "Followup",
  },
  {
    patient: "Sara Thomas",
    time: "02:15 PM",
    type: "Cardiology consult",
    status: "New",
  },
];

export function DashboardHome() {
  return (
    <Stack spacing={3}>
      <Box
        sx={{
          alignItems: { xs: "flex-start", md: "center" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography component="h2" variant="h4">
            Dashboard
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.75 }}>
            Track patient care, followups, and clinic activity from one clean workspace.
          </Typography>
        </Box>
        <Box
          aria-hidden="true"
          component="svg"
          viewBox="0 0 180 42"
          sx={{
            color: "primary.main",
            height: 42,
            maxWidth: 180,
            opacity: 0.75,
            width: { xs: 150, sm: 180 },
            "& path": {
              animation: `${ecgTrace} 1400ms ease-out both`,
              strokeDasharray: 120,
              strokeDashoffset: 120,
              [reducedMotionQuery]: {
                animation: "none",
                strokeDashoffset: 0,
              },
            },
          }}
        >
          <path
            d="M4 24 H34 L43 24 L50 9 L62 35 L74 16 L84 24 H112 L120 24 L127 15 L139 29 L148 24 H176"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        {statCards.map((card, cardIndex) => {
          const Icon = card.icon;

          return (
            <Box key={card.label} sx={entranceSx(cardIndex * 80)}>
              <Card sx={hoverLiftSx}>
                <CardContent>
                  <Stack
                    direction="row"
                    sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
                  >
                    <Box>
                      <Typography color="text.secondary" sx={{ fontWeight: 700 }} variant="body2">
                        {card.label}
                      </Typography>
                      <Typography sx={{ mt: 1 }} variant="h4">
                        <AnimatedNumber value={card.value} />
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        alignItems: "center",
                        animation: `${healthPulse} 2200ms ease-in-out infinite`,
                        bgcolor: "#e3f2fd",
                        borderRadius: 2,
                        color: "primary.main",
                        display: "flex",
                        height: 44,
                        justifyContent: "center",
                        width: 44,
                        [reducedMotionQuery]: {
                          animation: "none",
                        },
                      }}
                    >
                      <Icon />
                    </Box>
                  </Stack>
                  <Typography color="text.secondary" sx={{ mt: 2 }} variant="body2">
                    {card.helper}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 2fr) minmax(320px, 1fr)" },
        }}
      >
        <Box sx={entranceSx(260)}>
          <Card sx={[{ height: "100%" }, hoverLiftSx]}>
            <CardContent>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h6">Today&apos;s Appointments</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Upcoming patient interactions and followup status.
                  </Typography>
                </Box>
                <Button variant="contained">View All</Button>
              </Stack>

              <Stack spacing={1.5} sx={{ mt: 3 }}>
                {appointments.map((appointment, appointmentIndex) => (
                  <Box
                    key={`${appointment.patient}-${appointment.time}`}
                    sx={[
                      {
                        alignItems: { xs: "flex-start", sm: "center" },
                        bgcolor: "#f7fbff",
                        border: "1px solid rgba(21, 101, 192, 0.1)",
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 1.5,
                        justifyContent: "space-between",
                        p: 2,
                      },
                      hoverLiftSx,
                      entranceSx(340 + appointmentIndex * 70),
                    ]}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 800 }}>{appointment.patient}</Typography>
                      <Typography color="text.secondary" variant="body2">
                        {appointment.type}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                      <Typography color="text.secondary" sx={{ fontWeight: 700 }} variant="body2">
                        {appointment.time}
                      </Typography>
                      <Chip color="primary" label={appointment.status} size="small" variant="outlined" />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Box sx={entranceSx(320)}>
          <Card sx={[{ height: "100%" }, hoverLiftSx]}>
            <CardContent>
              <Typography variant="h6">Followup Progress</Typography>
              <Typography color="text.secondary" sx={{ mt: 0.75 }} variant="body2">
                Weekly care coordination completion.
              </Typography>

              <Stack spacing={2.5} sx={{ mt: 3 }}>
                <Box>
                  <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: 700 }} variant="body2">
                      Calls completed
                    </Typography>
                    <Typography color="primary.main" sx={{ fontWeight: 800 }} variant="body2">
                      76%
                    </Typography>
                  </Stack>
                  <LinearProgress sx={{ mt: 1, height: 8, borderRadius: 6 }} value={76} variant="determinate" />
                </Box>

                <Box>
                  <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: 700 }} variant="body2">
                      Reports reviewed
                    </Typography>
                    <Typography color="primary.main" sx={{ fontWeight: 800 }} variant="body2">
                      61%
                    </Typography>
                  </Stack>
                  <LinearProgress sx={{ mt: 1, height: 8, borderRadius: 6 }} value={61} variant="determinate" />
                </Box>

                <Box
                  sx={{
                    animation: `${healthPulse} 2600ms ease-in-out infinite`,
                    bgcolor: "#eaf4ff",
                    borderRadius: 2,
                    p: 2,
                    [reducedMotionQuery]: {
                      animation: "none",
                    },
                  }}
                >
                  <Typography color="primary.dark" sx={{ fontWeight: 800 }}>
                    24 high-priority patients
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 0.5 }} variant="body2">
                    Need followup action before end of day.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Stack>
  );
}
