import { useAsync } from "react-use";
import { fetchAppointmentDetailsById, fetchContacts } from "utils";

export function useDashboardData({ user }) {
  const { loading: contactLatency, value: contacts } = useAsync(() =>
    fetchContacts(user)
  );

  const { loading: upcomingAppointmentsLatency, value: appointments } =
    useAsync(() => fetchAppointmentDetailsById(user));

  return {
    loading: contactLatency || upcomingAppointmentsLatency,
    contacts: contacts?.data?.data,
    appointments: appointments?.data?.data,
  };
}
