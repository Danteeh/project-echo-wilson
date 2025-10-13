import DashboardPage from "../features/dashboard/DashboardPage";
import mockRecords from "../data/mockRecords"

export default function Dashboard() {
  console.log("Los datos en dasboard son",mockRecords);
  return <DashboardPage data={mockRecords}/>;
}
