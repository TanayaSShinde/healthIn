import { useState, type FormEvent } from "react";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { GenericForm, type GenericFormField } from "../../components/common/GenericForm";
import type { PatientFormValues } from "./patientMockData";

type AddPatientPageProps = {
  existingPatientIds: string[];
  onCancel: () => void;
  onSave: (values: PatientFormValues) => void;
  suggestedPatientId: string;
};

const addPatientFields: GenericFormField<PatientFormValues>[] = [
  {
    label: "Patient ID",
    name: "patientId",
    required: true,
    placeholder: "P7",
  },
  {
    label: "Patient Name",
    name: "patientName",
    required: true,
    placeholder: "Enter patient name",
  },
  {
    label: "Age",
    name: "age",
    required: true,
    placeholder: "34",
    type: "number",
  },
  {
    label: "Date of Birth",
    name: "dateOfBirth",
    required: true,
    type: "date",
  },
  {
    label: "Gender",
    name: "gender",
    required: true,
    type: "select",
    options: [
      { label: "Female", value: "Female" },
      { label: "Male", value: "Male" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    label: "Mobile Number",
    name: "mobileNumber",
    required: true,
    placeholder: "+91 98765 43210",
  },
  {
    label: "Email",
    name: "email",
    required: true,
    placeholder: "patient@example.com",
    type: "email",
  },
  {
    label: "Address",
    name: "address",
    required: true,
    rows: 3,
    span: 2,
    type: "textarea",
  },
  {
    accept: ".pdf,.png,.jpg,.jpeg,.doc,.docx",
    helperText: "PDF, PNG, JPG, DOC, or DOCX files only.",
    label: "Upload Report",
    name: "reportFile",
    span: 2,
    type: "file",
  },
  {
    label: "Medicines",
    name: "medicines",
    required: true,
    rows: 3,
    span: 2,
    type: "textarea",
  },
];

function createInitialValues(suggestedPatientId: string): PatientFormValues {
  return {
    address: "",
    age: "",
    dateOfBirth: "",
    email: "",
    gender: "",
    medicines: "",
    mobileNumber: "",
    patientId: suggestedPatientId,
    patientName: "",
    reportFile: null,
  };
}

function validate(values: PatientFormValues, existingPatientIds: string[]) {
  const errors: Partial<Record<keyof PatientFormValues, string>> = {};
  const normalizedId = values.patientId.trim().toUpperCase();
  const ageNumber = Number(values.age);
  const mobileDigits = values.mobileNumber.replace(/\D/g, "");

  if (!normalizedId) {
    errors.patientId = "Patient ID is required.";
  } else if (existingPatientIds.some((id) => id.toUpperCase() === normalizedId)) {
    errors.patientId = "Patient ID already exists.";
  }

  if (!values.patientName.trim()) {
    errors.patientName = "Patient name is required.";
  }

  if (!values.age.trim()) {
    errors.age = "Age is required.";
  } else if (!Number.isFinite(ageNumber) || ageNumber <= 0) {
    errors.age = "Enter a valid age.";
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required.";
  } else {
    const dateOfBirth = new Date(`${values.dateOfBirth}T00:00:00`);
    if (Number.isNaN(dateOfBirth.getTime())) {
      errors.dateOfBirth = "Enter a valid date of birth.";
    } else if (dateOfBirth > new Date()) {
      errors.dateOfBirth = "Date of birth cannot be in the future.";
    }
  }

  if (!mobileDigits) {
    errors.mobileNumber = "Mobile number is required.";
  } else if (mobileDigits.length < 10) {
    errors.mobileNumber = "Enter a valid mobile number.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.address.trim()) {
    errors.address = "Address is required.";
  }

  if (!values.medicines.trim()) {
    errors.medicines = "Medicines are required.";
  }

  if (!values.gender.trim()) {
    errors.gender = "Gender is required.";
  }

  return errors;
}

export function AddPatientPage({
  existingPatientIds,
  onCancel,
  onSave,
  suggestedPatientId,
}: AddPatientPageProps) {
  const [values, setValues] = useState<PatientFormValues>(() =>
    createInitialValues(suggestedPatientId),
  );
  const [errors, setErrors] = useState<Partial<Record<keyof PatientFormValues, string>>>({});

  const handleChange = <K extends keyof PatientFormValues>(name: K, value: PatientFormValues[K]) => {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: name === "patientId" && typeof value === "string" ? value.toUpperCase() : value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values, existingPatientIds);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(values);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography component="h2" variant="h4">
          Add Patient
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.75 }}>
          Create a new patient profile and keep the list updated immediately.
        </Typography>
      </Box>

      <GenericForm
        cancelLabel="Cancel"
        fields={addPatientFields}
        onCancel={onCancel}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Patient"
        subtitle="Fields marked with an asterisk are required."
        title="Patient Details"
        values={values}
        errors={errors}
      />
    </Stack>
  );
}
