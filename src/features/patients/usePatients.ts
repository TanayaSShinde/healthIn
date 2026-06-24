import { useMemo, useState } from "react";
import {
  createInitialPatients,
  createPatientFromForm,
  getNextPatientId,
  type Patient,
  type PatientFormValues,
} from "./patientMockData";

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>(() => createInitialPatients());

  const nextPatientId = useMemo(() => getNextPatientId(patients), [patients]);

  const addPatient = (values: PatientFormValues) => {
    const nextPatient = createPatientFromForm(values, patients);
    setPatients((currentPatients) => [nextPatient, ...currentPatients]);
  };

  return {
    addPatient,
    nextPatientId,
    patients,
  };
}
