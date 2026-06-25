import { useState, type FormEvent } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { GenericForm, type GenericFormField } from "../../components/common/GenericForm";
import {
  createVisitFormValues,
  type Patient,
  type PatientVisitFormValues,
} from "./patientMockData";

type AddVisitPageProps = {
  onBack: () => void;
  onCancel: () => void;
  onSave: (values: PatientVisitFormValues) => void;
  patient: Patient;
};

const addVisitFields: GenericFormField<PatientVisitFormValues>[] = [
  {
    label: "Visit Date",
    name: "visitDate",
    required: true,
    type: "date",
  },
  {
    label: "Status",
    name: "status",
    options: [
      { label: "Completed", value: "Completed" },
      { label: "Scheduled", value: "Scheduled" },
      { label: "Follow-up Required", value: "Follow-up Required" },
      { label: "Cancelled", value: "Cancelled" },
    ],
    required: true,
    type: "select",
  },
  {
    label: "Follow-up Date",
    name: "followUpDate",
    type: "date",
  },
  {
    label: "Symptoms",
    name: "symptoms",
    placeholder: "Enter symptoms shared by the patient",
    required: true,
    rows: 3,
    span: 2,
    type: "textarea",
  },
  {
    label: "Diagnosis",
    name: "diagnosis",
    placeholder: "Enter diagnosis",
    required: true,
    rows: 3,
    span: 2,
    type: "textarea",
  },
  {
    label: "Prescription",
    name: "prescription",
    placeholder: "Enter medicines or treatment plan",
    rows: 3,
    span: 2,
    type: "textarea",
  },
  {
    label: "Notes",
    name: "notes",
    placeholder: "Additional observations",
    rows: 3,
    span: 2,
    type: "textarea",
  },
];

function validateVisit(values: PatientVisitFormValues) {
  const errors: Partial<Record<keyof PatientVisitFormValues, string>> = {};

  if (!values.visitDate) {
    errors.visitDate = "Visit date is required.";
  } else if (Number.isNaN(new Date(`${values.visitDate}T00:00:00`).getTime())) {
    errors.visitDate = "Enter a valid visit date.";
  }

  if (!values.status.trim()) {
    errors.status = "Status is required.";
  }

  if (!values.symptoms.trim()) {
    errors.symptoms = "Symptoms are required.";
  }

  if (!values.diagnosis.trim()) {
    errors.diagnosis = "Diagnosis is required.";
  }

  if (values.followUpDate) {
    const visitDate = new Date(`${values.visitDate}T00:00:00`);
    const followUpDate = new Date(`${values.followUpDate}T00:00:00`);

    if (Number.isNaN(followUpDate.getTime())) {
      errors.followUpDate = "Enter a valid follow-up date.";
    } else if (!Number.isNaN(visitDate.getTime()) && followUpDate < visitDate) {
      errors.followUpDate = "Follow-up date cannot be before the visit date.";
    }
  }

  if (values.status === "Follow-up Required" && !values.followUpDate) {
    errors.followUpDate = "Follow-up date is required for this status.";
  }

  return errors;
}

export function AddVisitPage({ onBack, onCancel, onSave, patient }: AddVisitPageProps) {
  const [values, setValues] = useState<PatientVisitFormValues>(() => createVisitFormValues());
  const [errors, setErrors] = useState<Partial<Record<keyof PatientVisitFormValues, string>>>({});

  const handleChange = <K extends keyof PatientVisitFormValues>(
    name: K,
    value: PatientVisitFormValues[K],
  ) => {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateVisit(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(values);
  };

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
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 0.75 }}
          >
            <Typography component="h2" variant="h4">
              Add Visit
            </Typography>
            <Chip label={patient.id} size="small" color="primary" />
          </Stack>
          <Typography color="text.secondary" sx={{ mt: 0.75 }}>
            {patient.name}
          </Typography>
        </Box>

        <Button
          onClick={onBack}
          startIcon={<ArrowBackRoundedIcon />}
          variant="outlined"
          sx={{
            alignSelf: { xs: "stretch", sm: "flex-start" },
            minWidth: 120,
          }}
        >
          Back
        </Button>
      </Box>

      <GenericForm
        cancelLabel="Cancel"
        fields={addVisitFields}
        onCancel={onCancel}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Visit"
        subtitle="Fields marked with an asterisk are required."
        title="Visit Details"
        values={values}
        errors={errors}
      />
    </Stack>
  );
}
