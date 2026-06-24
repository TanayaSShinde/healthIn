export type PatientGender = "Female" | "Male" | "Other";

export type Patient = {
  address?: string;
  age: number;
  contactNumber: string;
  dateOfBirth?: string;
  email?: string;
  gender: PatientGender;
  id: string;
  lastVisitDate: string;
  medicines?: string;
  name: string;
  reportFileName?: string;
};

export type PatientFormValues = {
  address: string;
  age: string;
  dateOfBirth: string;
  email: string;
  gender: string;
  medicines: string;
  mobileNumber: string;
  patientId: string;
  patientName: string;
  reportFile: File | null;
};

export const mockPatients: Patient[] = [
  {
    id: "P1",
    name: "Anika Rao",
    age: 34,
    gender: "Female",
    contactNumber: "+91 98765 43210",
    lastVisitDate: "18 Jun 2026",
  },
  {
    id: "P2",
    name: "Rahul Mehta",
    age: 48,
    gender: "Male",
    contactNumber: "+91 98123 45670",
    lastVisitDate: "16 Jun 2026",
  },
  {
    id: "P3",
    name: "Sara Thomas",
    age: 29,
    gender: "Female",
    contactNumber: "+91 99887 76655",
    lastVisitDate: "12 Jun 2026",
  },
  {
    id: "P4",
    name: "Vikram Shah",
    age: 56,
    gender: "Male",
    contactNumber: "+91 91234 56789",
    lastVisitDate: "08 Jun 2026",
  },
  {
    id: "P5",
    name: "Meera Iyer",
    age: 41,
    gender: "Female",
    contactNumber: "+91 90909 11223",
    lastVisitDate: "03 Jun 2026",
  },
  {
    id: "P6",
    name: "Arjun Nair",
    age: 37,
    gender: "Male",
    contactNumber: "+91 97654 32109",
    lastVisitDate: "29 May 2026",
  },
];

export function createInitialPatients(): Patient[] {
  return mockPatients.map((patient) => ({ ...patient }));
}

function formatDisplayDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replaceAll(",", "");
}

function extractPatientNumber(patientId: string) {
  const match = patientId.trim().match(/^P(\d+)$/i);
  return match ? Number(match[1]) : 0;
}

export function getNextPatientId(patients: Patient[]) {
  const nextNumber =
    patients.reduce(
      (maxNumber, patient) =>
        Math.max(maxNumber, extractPatientNumber(patient.id)),
      0,
    ) + 1;
  return `P${nextNumber}`;
}

export function createPatientFromForm(
  values: PatientFormValues,
  patients: Patient[],
): Patient {
  return {
    address: values.address.trim(),
    age: Number(values.age),
    contactNumber: values.mobileNumber.trim(),
    dateOfBirth: values.dateOfBirth,
    email: values.email.trim(),
    gender: "Other",
    id: values.patientId.trim().toUpperCase(),
    lastVisitDate: formatDisplayDate(new Date()),
    medicines: values.medicines.trim(),
    name: values.patientName.trim(),
    reportFileName: values.reportFile?.name,
  };
}

export function isPatientIdAvailable(patientId: string, patients: Patient[]) {
  const normalizedId = patientId.trim().toUpperCase();
  return !patients.some((patient) => patient.id.toUpperCase() === normalizedId);
}
