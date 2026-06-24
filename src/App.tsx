import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppShell } from "./components/layout/AppShell";
import { DashboardHome } from "./features/dashboard/DashboardHome";
import { AddPatientPage } from "./features/patients/AddPatientPage";
import { PatientListPage } from "./features/patients/PatientListPage";
import { usePatients } from "./features/patients/usePatients";
import type { PatientFormValues } from "./features/patients/patientMockData";
import type { PageId } from "./shared/navigation";
import { appTheme } from "./theme/appTheme";
import "./App.css";

type AppPageId = PageId | "add-patient";

function App() {
  const [selectedPage, setSelectedPage] = useState<AppPageId>("dashboard");
  const { addPatient, nextPatientId, patients } = usePatients();

  const activeNavigationPage: PageId = selectedPage === "add-patient" ? "patients" : selectedPage;

  const handleNavigate = (pageId: PageId) => {
    setSelectedPage(pageId);
  };

  const handleSavePatient = (values: PatientFormValues) => {
    addPatient(values);
    setSelectedPage("patients");
  };

  const pageContent = (() => {
    switch (selectedPage) {
      case "patients":
        return <PatientListPage onAddNewPatient={() => setSelectedPage("add-patient")} patients={patients} />;
      case "add-patient":
        return (
          <AddPatientPage
            existingPatientIds={patients.map((patient) => patient.id)}
            onCancel={() => setSelectedPage("patients")}
            onSave={handleSavePatient}
            suggestedPatientId={nextPatientId}
          />
        );
      case "dashboard":
      case "followups":
      default:
        return <DashboardHome />;
    }
  })();

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AppShell onNavigate={handleNavigate} selectedPage={activeNavigationPage}>
        {pageContent}
      </AppShell>
    </ThemeProvider>
  );
}

export default App;
