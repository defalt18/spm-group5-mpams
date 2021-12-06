import { useAsync } from "react-use";
import { fetchAppointmentDetailsById, fetchContacts } from "utils";

export function useDashboardData({ user }, deps) {
  const { loading: contactLatency, value: contacts } = useAsync(
    () => fetchContacts(user),
    deps
  );

  const { loading: upcomingAppointmentsLatency, value: appointments } =
    useAsync(() => fetchAppointmentDetailsById(user), deps);

  return {
    loading: contactLatency || upcomingAppointmentsLatency,
    contacts: contacts?.data?.data,
    appointments: appointments?.data?.data,
  };
}
