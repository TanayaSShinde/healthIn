import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { GenericTable, type GenericTableColumn } from "../../components/common/GenericTable";
import {
  formatVisitDisplayDate,
  getLatestVisit,
  parseVisitDate,
  type Patient,
  type PatientVisit,
} from "./patientMockData";

type PatientDetailsPageProps = {
  onAddVisit: (patient: Patient) => void;
  onBack: () => void;
  patient: Patient;
  visits: PatientVisit[];
};

type DetailItem = {
  label: string;
  value?: string | number;
  valueDisplay?: "list" | "text";
};

type DetailsSectionProps = {
  details: DetailItem[];
  title: string;
};

function splitListItems(value: string | number | undefined, forceList: boolean) {
  if (value === undefined || value === null) {
    return [];
  }

  const normalizedValue = String(value).trim();

  if (!normalizedValue) {
    return [];
  }

  const lineItems = normalizedValue
    .split(/\r?\n/)
    .map((item) => item.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, "").trim())
    .filter(Boolean);

  if (lineItems.length > 1) {
    return lineItems;
  }

  if (!forceList) {
    return [normalizedValue];
  }

  return normalizedValue
    .split(/[,;]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function DetailValue({ value, valueDisplay = "text" }: Pick<DetailItem, "value" | "valueDisplay">) {
  const items = splitListItems(value, valueDisplay === "list");

  if (items.length === 0) {
    return (
      <Typography color="text.secondary" variant="body2">
        Not available
      </Typography>
    );
  }

  if (items.length === 1) {
    return (
      <Typography
        sx={{
          color: "text.primary",
          fontWeight: 700,
          lineHeight: 1.35,
          overflowWrap: "anywhere",
        }}
        variant="body2"
      >
        {items[0]}
      </Typography>
    );
  }

  return (
    <Box
      component="ul"
      sx={{
        color: "text.primary",
        fontWeight: 700,
        lineHeight: 1.35,
        listStylePosition: "outside",
        m: 0,
        mt: 0.25,
        overflowWrap: "anywhere",
        pl: 2.25,
      }}
    >
      {items.map((item) => (
        <Typography component="li" key={item} variant="body2" sx={{ mb: 0.35 }}>
          {item}
        </Typography>
      ))}
    </Box>
  );
}

function DetailField({ label, value, valueDisplay }: DetailItem) {
  return (
    <Box
      sx={{
        minWidth: 0,
      }}
    >
      <Typography color="text.secondary" variant="caption" sx={{ display: "block", lineHeight: 1.2 }}>
        {label}
      </Typography>
      <DetailValue value={value} valueDisplay={valueDisplay} />
    </Box>
  );
}

function DetailsSection({ details, title }: DetailsSectionProps) {
  return (
    <Paper
      sx={{
        border: "1px solid rgba(21, 101, 192, 0.12)",
        borderRadius: 2,
        boxShadow: "0 8px 20px rgba(13, 71, 161, 0.06)",
        p: { xs: 2, md: 2.5 },
      }}
    >
      <Typography component="h4" variant="subtitle2" sx={{ fontWeight: 800, mb: 1.25 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: { xs: 1.5, md: 2 },
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        {details.map((detail) => (
          <DetailField key={detail.label} {...detail} />
        ))}
      </Box>
    </Paper>
  );
}

const visitHistoryColumns: GenericTableColumn<PatientVisit>[] = [
  {
    id: "visitDate",
    label: "Visit Date",
    minWidth: 140,
    sortAccessor: (visit) => parseVisitDate(visit.visitDate),
    sortable: true,
    render: (visit) => formatVisitDisplayDate(visit.visitDate),
  },
  {
    id: "diagnosis",
    label: "Diagnosis",
    minWidth: 220,
    sortAccessor: (visit) => visit.diagnosis,
    sortable: true,
    render: (visit) => visit.diagnosis,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    sortAccessor: (visit) => visit.status,
    sortable: true,
    render: (visit) => (
      <Chip
        label={visit.status}
        size="small"
        color={visit.status === "Cancelled" ? "default" : "primary"}
        variant={visit.status === "Completed" ? "filled" : "outlined"}
      />
    ),
  },
  {
    id: "prescription",
    label: "Prescription",
    minWidth: 220,
    render: (visit) => visit.prescription || "Not available",
  },
  {
    id: "followUpDate",
    label: "Follow-up Date",
    minWidth: 160,
    sortAccessor: (visit) => (visit.followUpDate ? parseVisitDate(visit.followUpDate) : null),
    sortable: true,
    render: (visit) => (visit.followUpDate ? formatVisitDisplayDate(visit.followUpDate) : "Not scheduled"),
  },
  {
    id: "notes",
    label: "Notes",
    minWidth: 260,
    render: (visit) => visit.notes || "Not available",
  },
];

export function PatientDetailsPage({
  onAddVisit,
  onBack,
  patient,
  visits,
}: PatientDetailsPageProps) {
  const sortedVisits = [...visits].sort(
    (leftVisit, rightVisit) => parseVisitDate(rightVisit.visitDate) - parseVisitDate(leftVisit.visitDate),
  );
  const latestVisit = getLatestVisit(visits);
  const basicDetails: DetailItem[] = [
    { label: "Age", value: patient.age },
    { label: "Gender", value: patient.gender },
    { label: "Date of Birth", value: patient.dateOfBirth },
    { label: "Mobile Number", value: patient.contactNumber },
    { label: "Email", value: patient.email },
    { label: "Address", value: patient.address },
  ];
  const medicalHistoryDetails = ([
    { label: "Past Medical History", value: patient.pastMedicalHistory, valueDisplay: "list" },
    { label: "Family History", value: patient.familyHistory, valueDisplay: "list" },
  ] satisfies DetailItem[]).filter((detail) => Boolean(String(detail.value ?? "").trim()));
  const visitDetails = [
    {
      label: "Last Visit Date",
      value: latestVisit ? formatVisitDisplayDate(latestVisit.visitDate) : patient.lastVisitDate,
    },
    { label: "Diagnosis", value: latestVisit?.diagnosis },
    { label: "Status", value: latestVisit?.status },
    {
      label: "Follow-up Date",
      value: latestVisit?.followUpDate ? formatVisitDisplayDate(latestVisit.followUpDate) : undefined,
    },
    {
      label: "Medicines",
      value: latestVisit?.prescription || patient.medicines,
      valueDisplay: "list",
    },
    { label: "Notes", value: latestVisit?.notes },
    { label: "Report", value: patient.reportFileName },
  ] satisfies DetailItem[];

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          alignItems: { xs: "stretch", sm: "center" },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography component="h2" variant="h5" sx={{ fontWeight: 800 }}>
            Patient Details
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{
            alignSelf: { xs: "stretch", sm: "center" },
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          <Button
            onClick={() => onAddVisit(patient)}
            startIcon={<AddCircleOutlineRoundedIcon />}
            variant="contained"
            sx={{ minWidth: 140 }}
          >
            Add Visit
          </Button>
          <Button
            onClick={onBack}
            startIcon={<ArrowBackRoundedIcon />}
            variant="outlined"
            sx={{ minWidth: 120 }}
          >
            Back
          </Button>
        </Stack>
      </Box>

      <Paper
        sx={{
          border: "1px solid rgba(21, 101, 192, 0.12)",
          borderRadius: 2,
          boxShadow: "0 8px 20px rgba(13, 71, 161, 0.06)",
          p: { xs: 2, md: 2.5 },
        }}
      >
        <Box
          sx={{
            alignItems: { xs: "flex-start", sm: "center" },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1.25,
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 0.75 }}
            >
              <Typography component="h3" variant="h6" sx={{ fontWeight: 800 }}>
                {patient.name}
              </Typography>
              <Chip label={patient.id} size="small" color="primary" />
              <Chip label={patient.gender} size="small" color="primary" variant="outlined" />
            </Stack>
          </Box>
        </Box>

        <Typography component="h4" variant="subtitle2" sx={{ fontWeight: 800, mb: 1.25 }}>
          Basic Information
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 1.5, md: 2 },
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
          }}
        >
          {basicDetails.map((detail) => (
            <DetailField key={detail.label} {...detail} />
          ))}
        </Box>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            lg: medicalHistoryDetails.length > 0 ? "minmax(0, 1fr) minmax(0, 1fr)" : "1fr",
          },
        }}
      >
        {medicalHistoryDetails.length > 0 ? (
          <DetailsSection details={medicalHistoryDetails} title="Medical History" />
        ) : null}
        <DetailsSection details={visitDetails} title="Last Visit Details" />
      </Box>

      <Stack spacing={1.5}>
        <Typography component="h3" variant="h6" sx={{ fontWeight: 800 }}>
          Visit History
        </Typography>
        <GenericTable
          columns={visitHistoryColumns}
          data={sortedVisits}
          emptyMessage="No visits recorded for this patient."
          getRowKey={(visit) => visit.id}
          initialSortColumnId="visitDate"
          initialSortDirection="desc"
          initialRowsPerPage={5}
          pagination
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Stack>
    </Stack>
  );
}
