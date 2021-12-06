import { useCallback, useMemo } from "react";
import { deleteAppointmentById, updateAppointmentDetailsById } from "../utils";
import _has from "lodash/has";
import { useToggle } from "react-use";

export function useAppointmentActions(appointment) {
  const [loading, toggleLoading] = useToggle(false);
  const validAppointment = useMemo(() => {
    const { requestedTo, requestedBy, update, ...rest } = appointment;
    const [requestedToId, requestedById] = [
      _has(requestedTo, "_id") ? requestedTo?._id : requestedTo,
      _has(requestedBy, "_id") ? requestedBy?._id : requestedBy,
    ];
    return { ...rest, requestedBy: requestedById, requestedTo: requestedToId };
  }, [appointment]);
  const deleteAppointment = useCallback(async () => {
    toggleLoading();
    await deleteAppointmentById(appointment._id);
    appointment.update();
    toggleLoading();
  }, [appointment, toggleLoading]);
  const updateAppointment = useCallback(
    async (newDetails) => {
      toggleLoading();
      await updateAppointmentDetailsById({
        ...validAppointment,
        ...newDetails,
      });
      appointment.update();
      toggleLoading();
    },
    [validAppointment, appointment, toggleLoading]
  );

  return {
    loading,
    deleteAppointment,
    updateAppointment,
  };
}
