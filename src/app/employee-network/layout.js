import DashboardLayout from "../dashboard/components/DashboardLayout";

export default function EmployeeNetworkLayout({ children }) {
  return (
    <DashboardLayout title="Employee Network" greeting="Hello, Manager">
      {children}
    </DashboardLayout>
  );
}