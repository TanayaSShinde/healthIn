import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { GenericTable, type GenericTableColumn } from "../../components/common/GenericTable";
import type { Patient } from "./patientMockData";

const monthLookup = new Map<string, number>([
  ["jan", 0],
  ["feb", 1],
  ["mar", 2],
  ["apr", 3],
  ["may", 4],
  ["jun", 5],
  ["jul", 6],
  ["aug", 7],
  ["sep", 8],
  ["oct", 9],
  ["nov", 10],
  ["dec", 11],
]);

function parsePatientDate(displayDate: string) {
  const [dayPart, monthPart, yearPart] = displayDate.split(" ");

  if (!dayPart || !monthPart || !yearPart) {
    return 0;
  }

  const monthIndex = monthLookup.get(monthPart.toLowerCase());

  if (monthIndex === undefined) {
    return 0;
  }

  return new Date(Number(yearPart), monthIndex, Number(dayPart)).getTime();
}

const genderShortLabels: Record<Patient["gender"], string> = {
  Female: "F",
  Male: "M",
  Other: "O",
};

const patientColumns: GenericTableColumn<Patient>[] = [
  {
    id: "id",
    label: "Patient ID",
    filterAccessor: (patient) => patient.id,
    filterable: true,
    minWidth: 120,
    sortAccessor: (patient) => patient.id,
    sortable: true,
    render: (patient) => (
      <Typography sx={{ color: "text.primary", fontWeight: 800 }}>{patient.id}</Typography>
    ),
  },
  {
    id: "name",
    label: "Name",
    filterAccessor: (patient) => patient.name,
    filterable: true,
    filterMatchMode: "startsWith",
    minWidth: 190,
    sortAccessor: (patient) => patient.name,
    sortable: true,
    render: (patient) => (
      <Typography sx={{ color: "text.primary", fontWeight: 800 }}>{patient.name}</Typography>
    ),
  },
  {
    id: "age",
    label: "Age",
    filterAccessor: (patient) => patient.age,
    filterable: true,
    minWidth: 90,
    sortAccessor: (patient) => patient.age,
    sortable: true,
    render: (patient) => patient.age,
  },
  {
    id: "gender",
    label: "Gender",
    filterAccessor: (patient) => patient.gender,
    filterable: true,
    minWidth: 120,
    sortAccessor: (patient) => patient.gender,
    sortable: true,
    render: (patient) => (
      <Chip
        label={genderShortLabels[patient.gender]}
        size="small"
        title={patient.gender}
        sx={{
          bgcolor: "#eaf4ff",
          color: "primary.dark",
          fontWeight: 700,
          minWidth: 40,
        }}
      />
    ),
  },
  {
    id: "contactNumber",
    label: "Contact Number",
    filterAccessor: (patient) => patient.contactNumber,
    filterable: true,
    minWidth: 170,
    sortAccessor: (patient) => patient.contactNumber,
    sortable: true,
    render: (patient) => patient.contactNumber,
  },
  {
    id: "lastVisitDate",
    label: "Last Visit Date",
    filterAccessor: (patient) => patient.lastVisitDate,
    filterable: true,
    minWidth: 150,
    sortAccessor: (patient) => parsePatientDate(patient.lastVisitDate),
    sortable: true,
    render: (patient) => patient.lastVisitDate || "Not available",
  },
];

type PatientListPageProps = {
  onAddNewPatient: () => void;
  onAddVisit: (patient: Patient) => void;
  onEditPatient: (patient: Patient) => void;
  onViewPatient: (patient: Patient) => void;
  patients: Patient[];
};

export function PatientListPage({
  onAddNewPatient,
  onAddVisit,
  onEditPatient,
  onViewPatient,
  patients,
}: PatientListPageProps) {
  return (
    <Stack spacing={3}>
      <Box
        sx={{
          alignItems: { xs: "stretch", sm: "flex-start" },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography component="h2" variant="h4">
            Patient Management
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.75 }}>
            Sort and filter patient profiles from one list.
          </Typography>
        </Box>

        <Button
          onClick={onAddNewPatient}
          startIcon={<AddCircleOutlineRoundedIcon />}
          variant="contained"
          sx={{
            alignSelf: { xs: "stretch", sm: "flex-start" },
            minWidth: 180,
          }}
        >
          Add New Patient
        </Button>
      </Box>

      <GenericTable
        columns={patientColumns}
        data={patients}
        emptyMessage="No patients match your search."
        getRowKey={(patient) => patient.id}
        initialRowsPerPage={5}
        pagination
        renderActions={(patient) => (
          <Stack direction="row" spacing={0.75} sx={{ justifyContent: "flex-end" }}>
            <Tooltip title="View patient details">
              <IconButton
                aria-label={`View details for ${patient.name}`}
                color="primary"
                onClick={() => onViewPatient(patient)}
                size="small"
              >
                <VisibilityRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit patient">
              <IconButton
                aria-label={`Edit details for ${patient.name}`}
                color="primary"
                onClick={() => onEditPatient(patient)}
                size="small"
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add new visit">
              <IconButton
                aria-label={`Add a new visit for ${patient.name}`}
                color="primary"
                onClick={() => onAddVisit(patient)}
                size="small"
              >
                <AddCircleOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Stack>
  );
}
