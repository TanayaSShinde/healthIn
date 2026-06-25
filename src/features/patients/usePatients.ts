import { useMemo, useState } from "react";
import {
  createInitialVisits,
  createInitialPatients,
  createPatientFromForm,
  createVisitFromForm,
  formatVisitDisplayDate,
  getLatestVisit,
  getNextPatientId,
  getNextVisitId,
  type Patient,
  type PatientFormValues,
  type PatientVisitFormValues,
} from "./patientMockData";

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>(() => createInitialPatients());
  const [visits, setVisits] = useState(() => createInitialVisits());

  const nextPatientId = useMemo(() => getNextPatientId(patients), [patients]);
  const nextVisitId = useMemo(() => getNextVisitId(visits), [visits]);

  const addPatient = (values: PatientFormValues) => {
    const nextPatient = createPatientFromForm(values);
    setPatients((currentPatients) => [nextPatient, ...currentPatients]);
  };

  const updatePatient = (patientId: string, values: PatientFormValues) => {
    setPatients((currentPatients) =>
      currentPatients.map((patient) =>
        patient.id === patientId ? createPatientFromForm(values, patient) : patient,
      ),
    );
  };

  const addVisit = (patientId: string, values: PatientVisitFormValues) => {
    const nextVisit = createVisitFromForm(values, patientId, nextVisitId);

    setVisits((currentVisits) => [nextVisit, ...currentVisits]);
    setPatients((currentPatients) =>
      currentPatients.map((patient) => {
        if (patient.id !== patientId) {
          return patient;
        }

        const latestVisit = getLatestVisit([
          nextVisit,
          ...visits.filter((visit) => visit.patientId === patientId),
        ]);

        if (!latestVisit) {
          return patient;
        }

        return {
          ...patient,
          lastVisitDate: formatVisitDisplayDate(latestVisit.visitDate),
          medicines: latestVisit.prescription || patient.medicines,
        };
      }),
    );
  };

  const getPatientVisits = (patientId: string) =>
    visits.filter((visit) => visit.patientId === patientId);

  return {
    addPatient,
    addVisit,
    getPatientVisits,
    nextPatientId,
    nextVisitId,
    patients,
    updatePatient,
    visits,
  };
}
