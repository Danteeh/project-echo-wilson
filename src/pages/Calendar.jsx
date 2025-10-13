import CalendarPage from "../components/calendar/CalendarPage";
import mockRecords from "../data/mockRecords";


export default function Calendar() {
    return <CalendarPage records={mockRecords} />;
}
