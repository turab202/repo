import EmployerDashboard from "../features/dashboard/EmployerDashboard";

export function meta() {
  return [
    { title: "Employer Dashboard - Talent Hub" },
    { name: "description", content: "Employer dashboard for Talent Hub" },
  ];
}

export default function EmployerDashboardRoute() {
  return <EmployerDashboard />;
}