export type PatientGender = "Female" | "Male" | "Other";

export type Patient = {
  address?: string;
  age: number;
  contactNumber: string;
  dateOfBirth?: string;
  email?: string;
  familyHistory?: string;
  gender: PatientGender;
  id: string;
  lastVisitDate: string;
  medicines?: string;
  name: string;
  pastMedicalHistory?: string;
  reportFileName?: string;
};

export type PatientVisitStatus = "Scheduled" | "Completed" | "Follow-up Required" | "Cancelled";

export type PatientVisit = {
  diagnosis: string;
  followUpDate?: string;
  id: string;
  notes?: string;
  patientId: string;
  prescription?: string;
  status: PatientVisitStatus;
  symptoms: string;
  visitDate: string;
};

export type PatientFormValues = {
  address: string;
  age: string;
  dateOfBirth: string;
  email: string;
  familyHistory: string;
  gender: string;
  medicines: string;
  mobileNumber: string;
  pastMedicalHistory: string;
  patientId: string;
  patientName: string;
  reportFile: File | null;
};

export type PatientVisitFormValues = {
  diagnosis: string;
  followUpDate: string;
  notes: string;
  prescription: string;
  status: string;
  symptoms: string;
  visitDate: string;
};

const patientGenders: PatientGender[] = ["Female", "Male", "Other"];
const visitStatuses: PatientVisitStatus[] = [
  "Scheduled",
  "Completed",
  "Follow-up Required",
  "Cancelled",
];

export const mockPatients: Patient[] = [
  {
    address: "12 Residency Road, Bengaluru",
    dateOfBirth: "1992-04-18",
    email: "anika.rao@example.com",
    familyHistory: "Mother has hypothyroidism.",
    id: "P1",
    name: "Anika Rao",
    age: 34,
    gender: "Female",
    contactNumber: "+91 98765 43210",
    lastVisitDate: "18 Jun 2026",
    medicines: "Vitamin D3, Calcium supplement",
    pastMedicalHistory: "Vitamin D deficiency diagnosed in 2025.",
  },
  {
    address: "42 Marine Drive, Mumbai",
    dateOfBirth: "1978-01-09",
    email: "rahul.mehta@example.com",
    familyHistory: "Father has type 2 diabetes.",
    id: "P2",
    name: "Rahul Mehta",
    age: 48,
    gender: "Male",
    contactNumber: "+91 98123 45670",
    lastVisitDate: "16 Jun 2026",
    medicines: "Metformin 500mg, Atorvastatin 10mg",
    pastMedicalHistory: "Type 2 diabetes, hyperlipidemia.",
  },
  {
    address: "8 Park Street, Kolkata",
    dateOfBirth: "1997-08-23",
    email: "sara.thomas@example.com",
    id: "P3",
    name: "Sara Thomas",
    age: 29,
    gender: "Female",
    contactNumber: "+91 99887 76655",
    lastVisitDate: "12 Jun 2026",
    medicines: "Cetirizine 10mg as needed",
    pastMedicalHistory: "Seasonal allergies.",
  },
  {
    address: "25 CG Road, Ahmedabad",
    dateOfBirth: "1970-03-14",
    email: "vikram.shah@example.com",
    familyHistory: "Family history of hypertension.",
    id: "P4",
    name: "Vikram Shah",
    age: 56,
    gender: "Male",
    contactNumber: "+91 91234 56789",
    lastVisitDate: "08 Jun 2026",
    medicines: "Amlodipine 5mg",
    pastMedicalHistory: "Hypertension.",
  },
  {
    address: "31 T Nagar, Chennai",
    dateOfBirth: "1985-11-02",
    email: "meera.iyer@example.com",
    familyHistory: "Mother has thyroid disorder.",
    id: "P5",
    name: "Meera Iyer",
    age: 41,
    gender: "Female",
    contactNumber: "+91 90909 11223",
    lastVisitDate: "03 Jun 2026",
    medicines: "Thyroxine 50mcg",
    pastMedicalHistory: "Hypothyroidism.",
  },
  {
    address: "16 MG Road, Kochi",
    dateOfBirth: "1989-07-27",
    email: "arjun.nair@example.com",
    id: "P6",
    name: "Arjun Nair",
    age: 37,
    gender: "Male",
    contactNumber: "+91 97654 32109",
    lastVisitDate: "29 May 2026",
    medicines: "Pantoprazole 40mg",
    pastMedicalHistory: "Acid reflux.",
  },
];

export const mockPatientVisits: PatientVisit[] = [
  {
    diagnosis: "Vitamin D deficiency review",
    followUpDate: "2026-07-18",
    id: "V1",
    notes: "Continue supplements and repeat vitamin D level before next visit.",
    patientId: "P1",
    prescription: "Vitamin D3, Calcium supplement",
    status: "Completed",
    symptoms: "Fatigue and mild body ache",
    visitDate: "2026-06-18",
  },
  {
    diagnosis: "Type 2 diabetes follow-up",
    followUpDate: "2026-07-16",
    id: "V2",
    notes: "Reviewed fasting glucose readings and reinforced diet plan.",
    patientId: "P2",
    prescription: "Metformin 500mg, Atorvastatin 10mg",
    status: "Completed",
    symptoms: "Routine sugar review",
    visitDate: "2026-06-16",
  },
  {
    diagnosis: "Seasonal allergic rhinitis",
    id: "V3",
    notes: "Avoid dust exposure and use antihistamine only when symptomatic.",
    patientId: "P3",
    prescription: "Cetirizine 10mg as needed",
    status: "Completed",
    symptoms: "Sneezing and watery eyes",
    visitDate: "2026-06-12",
  },
  {
    diagnosis: "Hypertension review",
    followUpDate: "2026-07-08",
    id: "V4",
    notes: "Blood pressure controlled. Continue monitoring at home.",
    patientId: "P4",
    prescription: "Amlodipine 5mg",
    status: "Completed",
    symptoms: "Routine BP check",
    visitDate: "2026-06-08",
  },
  {
    diagnosis: "Hypothyroidism follow-up",
    followUpDate: "2026-07-03",
    id: "V5",
    notes: "TSH review advised before next visit.",
    patientId: "P5",
    prescription: "Thyroxine 50mcg",
    status: "Completed",
    symptoms: "Routine thyroid review",
    visitDate: "2026-06-03",
  },
  {
    diagnosis: "Gastroesophageal reflux disease",
    id: "V6",
    notes: "Avoid late meals and spicy food.",
    patientId: "P6",
    prescription: "Pantoprazole 40mg",
    status: "Completed",
    symptoms: "Acid reflux and heartburn",
    visitDate: "2026-05-29",
  },
];

export function createInitialPatients(): Patient[] {
  return mockPatients.map((patient) => ({ ...patient }));
}

export function createInitialVisits(): PatientVisit[] {
  return mockPatientVisits.map((visit) => ({ ...visit }));
}

export function formatDisplayDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replace(/,/g, "");
}

export function formatVisitDisplayDate(dateValue: string) {
  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return formatDisplayDate(date);
}

export function parseVisitDate(dateValue: string) {
  const date = new Date(`${dateValue}T00:00:00`);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
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

function extractVisitNumber(visitId: string) {
  const match = visitId.trim().match(/^V(\d+)$/i);
  return match ? Number(match[1]) : 0;
}

export function getNextVisitId(visits: PatientVisit[]) {
  const nextNumber =
    visits.reduce(
      (maxNumber, visit) => Math.max(maxNumber, extractVisitNumber(visit.id)),
      0,
    ) + 1;
  return `V${nextNumber}`;
}

function getPatientGender(value: string): PatientGender {
  return patientGenders.includes(value as PatientGender) ? (value as PatientGender) : "Other";
}

function getVisitStatus(value: string): PatientVisitStatus {
  return visitStatuses.includes(value as PatientVisitStatus)
    ? (value as PatientVisitStatus)
    : "Scheduled";
}

export function createPatientFormValues(patient: Patient): PatientFormValues {
  return {
    address: patient.address ?? "",
    age: String(patient.age),
    dateOfBirth: patient.dateOfBirth ?? "",
    email: patient.email ?? "",
    familyHistory: patient.familyHistory ?? "",
    gender: patient.gender,
    medicines: patient.medicines ?? "",
    mobileNumber: patient.contactNumber,
    pastMedicalHistory: patient.pastMedicalHistory ?? "",
    patientId: patient.id,
    patientName: patient.name,
    reportFile: null,
  };
}

export function createPatientFromForm(values: PatientFormValues, existingPatient?: Patient): Patient {
  return {
    address: values.address.trim(),
    age: Number(values.age),
    contactNumber: values.mobileNumber.trim(),
    dateOfBirth: values.dateOfBirth,
    email: values.email.trim(),
    familyHistory: values.familyHistory.trim(),
    gender: getPatientGender(values.gender),
    id: values.patientId.trim().toUpperCase(),
    lastVisitDate: existingPatient?.lastVisitDate ?? "",
    medicines: values.medicines.trim(),
    name: values.patientName.trim(),
    pastMedicalHistory: values.pastMedicalHistory.trim(),
    reportFileName: values.reportFile?.name ?? existingPatient?.reportFileName,
  };
}

export function createVisitFormValues(): PatientVisitFormValues {
  return {
    diagnosis: "",
    followUpDate: "",
    notes: "",
    prescription: "",
    status: "Completed",
    symptoms: "",
    visitDate: new Date().toISOString().slice(0, 10),
  };
}

export function createVisitFromForm(
  values: PatientVisitFormValues,
  patientId: string,
  visitId: string,
): PatientVisit {
  return {
    diagnosis: values.diagnosis.trim(),
    followUpDate: values.followUpDate,
    id: visitId,
    notes: values.notes.trim(),
    patientId,
    prescription: values.prescription.trim(),
    status: getVisitStatus(values.status),
    symptoms: values.symptoms.trim(),
    visitDate: values.visitDate,
  };
}

export function getLatestVisit(visits: PatientVisit[]) {
  return [...visits].sort((leftVisit, rightVisit) => {
    const dateComparison = parseVisitDate(rightVisit.visitDate) - parseVisitDate(leftVisit.visitDate);

    if (dateComparison !== 0) {
      return dateComparison;
    }

    return rightVisit.id.localeCompare(leftVisit.id, undefined, { numeric: true });
  })[0];
}

export function isPatientIdAvailable(patientId: string, patients: Patient[]) {
  const normalizedId = patientId.trim().toUpperCase();
  return !patients.some((patient) => patient.id.toUpperCase() === normalizedId);
}
