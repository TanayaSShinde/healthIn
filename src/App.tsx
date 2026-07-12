import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppShell } from "./components/layout/AppShell";
import { Login } from "./components/Login/Login";
import { DashboardHome } from "./features/dashboard/DashboardHome";
import { AddPatientPage } from "./features/patients/AddPatientPage";
import { AddVisitPage } from "./features/patients/AddVisitPage";
import { PatientDetailsPage } from "./features/patients/PatientDetailsPage";
import { PatientListPage } from "./features/patients/PatientListPage";
import { usePatients } from "./features/patients/usePatients";
import {
  createPatientFormValues,
  type Patient,
  type PatientFormValues,
  type PatientVisitFormValues,
} from "./features/patients/patientMockData";
import type { PageId } from "./shared/navigation";
import { appTheme } from "./theme/appTheme";

type AppPageId = PageId | "add-patient" | "edit-patient" | "view-patient" | "add-visit";

function App() {
  const [selectedPage, setSelectedPage] = useState<AppPageId>("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patientFormReturnPage, setPatientFormReturnPage] = useState<PageId>("patients");
  const [visitFormReturnPage, setVisitFormReturnPage] = useState<AppPageId>("patients");
  const [editingPatientId, setEditingPatientId] = useState<string | null>(null);
  const [viewingPatientId, setViewingPatientId] = useState<string | null>(null);
  const [visitPatientId, setVisitPatientId] = useState<string | null>(null);
  const { addPatient, addVisit, getPatientVisits, nextPatientId, patients, updatePatient } = usePatients();

  const activeNavigationPage: PageId =
    selectedPage === "add-patient" ||
      selectedPage === "edit-patient" ||
      selectedPage === "view-patient" ||
      selectedPage === "add-visit"
      ? "patients"
      : selectedPage;
  const editingPatient = patients.find((patient) => patient.id === editingPatientId);
  const viewingPatient = patients.find((patient) => patient.id === viewingPatientId);
  const visitPatient = patients.find((patient) => patient.id === visitPatientId);

  const handleNavigate = (pageId: PageId) => {
    setSelectedPage(pageId);
    setEditingPatientId(null);
    setViewingPatientId(null);
    setVisitPatientId(null);
  };

  const handleAddNewPatient = () => {
    setEditingPatientId(null);
    setViewingPatientId(null);
    setVisitPatientId(null);
    setPatientFormReturnPage(activeNavigationPage);
    setSelectedPage("add-patient");
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatientId(patient.id);
    setViewingPatientId(null);
    setVisitPatientId(null);
    setPatientFormReturnPage(activeNavigationPage);
    setSelectedPage("edit-patient");
  };

  const handleViewPatient = (patient: Patient) => {
    setViewingPatientId(patient.id);
    setEditingPatientId(null);
    setVisitPatientId(null);
    setPatientFormReturnPage(activeNavigationPage);
    setSelectedPage("view-patient");
  };

  const handleAddVisit = (patient: Patient) => {
    setVisitPatientId(patient.id);
    setEditingPatientId(null);
    setVisitFormReturnPage(selectedPage === "view-patient" ? "view-patient" : activeNavigationPage);
    setSelectedPage("add-visit");
  };

  const handleReturnFromPatientForm = () => {
    setSelectedPage(patientFormReturnPage);
    setEditingPatientId(null);
    setViewingPatientId(null);
    setVisitPatientId(null);
  };

  const handleReturnFromVisitForm = () => {
    if (visitFormReturnPage === "view-patient" && visitPatientId) {
      setViewingPatientId(visitPatientId);
    } else {
      setViewingPatientId(null);
    }

    setSelectedPage(visitFormReturnPage);
    setEditingPatientId(null);
    setVisitPatientId(null);
  };

  const handleSavePatient = (values: PatientFormValues) => {
    addPatient(values);
    handleReturnFromPatientForm();
  };

  const handleUpdatePatient = (values: PatientFormValues) => {
    if (!editingPatientId) {
      return;
    }

    updatePatient(editingPatientId, values);
    handleReturnFromPatientForm();
  };

  const handleSaveVisit = (values: PatientVisitFormValues) => {
    if (!visitPatientId) {
      return;
    }

    addVisit(visitPatientId, values);
    setViewingPatientId(visitPatientId);
    setEditingPatientId(null);
    setVisitPatientId(null);
    setSelectedPage("view-patient");
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setSelectedPage("dashboard");
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  const pageContent = (() => {
    switch (selectedPage) {
      case "patients":
        return (
          <PatientListPage
            onAddNewPatient={handleAddNewPatient}
            onAddVisit={handleAddVisit}
            onEditPatient={handleEditPatient}
            onViewPatient={handleViewPatient}
            patients={patients}
          />
        );
      case "add-patient":
        return (
          <AddPatientPage
            key="add-patient"
            existingPatientIds={patients.map((patient) => patient.id)}
            onBack={handleReturnFromPatientForm}
            onCancel={handleReturnFromPatientForm}
            onSave={handleSavePatient}
            suggestedPatientId={nextPatientId}
          />
        );
      case "edit-patient":
        if (!editingPatient) {
          return (
            <PatientListPage
              onAddNewPatient={handleAddNewPatient}
              onAddVisit={handleAddVisit}
              onEditPatient={handleEditPatient}
              onViewPatient={handleViewPatient}
              patients={patients}
            />
          );
        }

        return (
          <AddPatientPage
            key={`edit-patient-${editingPatient.id}`}
            existingPatientIds={patients
              .filter((patient) => patient.id !== editingPatient.id)
              .map((patient) => patient.id)}
            initialValues={createPatientFormValues(editingPatient)}
            mode="edit"
            onBack={handleReturnFromPatientForm}
            onCancel={handleReturnFromPatientForm}
            onSave={handleUpdatePatient}
            suggestedPatientId={nextPatientId}
          />
        );
      case "add-visit":
        if (!visitPatient) {
          return (
            <PatientListPage
              onAddNewPatient={handleAddNewPatient}
              onAddVisit={handleAddVisit}
              onEditPatient={handleEditPatient}
              onViewPatient={handleViewPatient}
              patients={patients}
            />
          );
        }

        return (
          <AddVisitPage
            key={`add-visit-${visitPatient.id}`}
            onBack={handleReturnFromVisitForm}
            onCancel={handleReturnFromVisitForm}
            onSave={handleSaveVisit}
            patient={visitPatient}
          />
        );
      case "view-patient":
        if (!viewingPatient) {
          return (
            <PatientListPage
              onAddNewPatient={handleAddNewPatient}
              onAddVisit={handleAddVisit}
              onEditPatient={handleEditPatient}
              onViewPatient={handleViewPatient}
              patients={patients}
            />
          );
        }

        return (
          <PatientDetailsPage
            key={`view-patient-${viewingPatient.id}`}
            onAddVisit={handleAddVisit}
            onBack={handleReturnFromPatientForm}
            patient={viewingPatient}
            visits={getPatientVisits(viewingPatient.id)}
          />
        );
      case "dashboard":
        return <DashboardHome />;
      case "followups":
      default:
        return <div>Follow-ups page is under development.</div>;
    }
  })();

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AppShell
        onNavigate={handleNavigate}
        pageTransitionKey={`${selectedPage}-${editingPatientId ?? viewingPatientId ?? visitPatientId ?? ""}`}
        selectedPage={activeNavigationPage}
      >
        {pageContent}
      </AppShell>
    </ThemeProvider>
  );
}

export default App;
