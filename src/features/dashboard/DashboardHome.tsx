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

const statCards = [
  {
    label: "Active Patients",
    value: "1,248",
    helper: "126 added this month",
    icon: LocalHospitalRoundedIcon,
  },
  {
    label: "Pending Followups",
    value: "84",
    helper: "18 due today",
    icon: AccessTimeRoundedIcon,
  },
  {
    label: "Completed Visits",
    value: "318",
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
      <Box>
        <Typography component="h2" variant="h4">
          Dashboard
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.75 }}>
          Track patient care, followups, and clinic activity from one clean workspace.
        </Typography>
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
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <Box key={card.label}>
              <Card>
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
                        {card.value}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        alignItems: "center",
                        bgcolor: "#e3f2fd",
                        borderRadius: 2,
                        color: "primary.main",
                        display: "flex",
                        height: 44,
                        justifyContent: "center",
                        width: 44,
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
        <Box>
          <Card sx={{ height: "100%" }}>
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
                {appointments.map((appointment) => (
                  <Box
                    key={`${appointment.patient}-${appointment.time}`}
                    sx={{
                      alignItems: { xs: "flex-start", sm: "center" },
                      bgcolor: "#f7fbff",
                      border: "1px solid rgba(21, 101, 192, 0.1)",
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 1.5,
                      justifyContent: "space-between",
                      p: 2,
                    }}
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

        <Box>
          <Card sx={{ height: "100%" }}>
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
                    bgcolor: "#eaf4ff",
                    borderRadius: 2,
                    p: 2,
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
