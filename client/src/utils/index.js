import axios from "axios";
import _reduce from "lodash/reduce";
import _isEmpty from "lodash/isEmpty";

const BASE_URL = "https://spm-group5-mpams.herokuapp.com/";
// const BASE_URL = "http://localhost:8000/";

export const setUser = async (registerUser, User) => {
  registerUser(User);
  localStorage.setItem("user-token", JSON.stringify(User));
};

export const logoutUser = async (setUserStatus) => {
  setUserStatus(null);
  localStorage.clear();
};

export const getUser = async (user) => {
  const result = await axios.post(BASE_URL + "api/auth/google/callback", {
    user: {
      email: user.email,
      name: user.name,
      photo: user.imageUrl,
    },
  });

  return result.data.data;
};

export const registerUser = async (user) => {
  const result = await axios.post(BASE_URL + "api/auth/register", { user });

  return result.data;
};

export const addWorkspaces = async (workspaces, user) => {
  return await _reduce(
    workspaces,
    async (allWorkspaces, data) => {
      const result = await axios.post(BASE_URL + "api/workspace", {
        user,
        data,
      });
      return [...(await allWorkspaces), result.data.data];
    },
    []
  );
};

export const fetchProfessionals = async (searchString, profession) => {
  const result = await axios.post(
    BASE_URL + `api/searchUser/${_isEmpty(profession) ? "all" : profession}`,
    {
      searchString,
    }
  );

  return result.data.data;
};

export const fetchWorkspaces = async (workspaceInfo) => {
  return await _reduce(
    workspaceInfo,
    async (allData, id) => {
      const result = await axios.get(BASE_URL + `api/workspace/${id}`);
      return [...(await allData), result.data.data];
    },
    []
  );
};

export const createAppointment = async (
  user,
  appointment,
  professionalEmail
) => {
  return await axios.post(
    BASE_URL + `api/appointment/${appointment.requestedTo}`,
    { user, ...appointment, professionalEmail }
  );
};

export const fetchAppointmentsForMonth = async (user, date) => {
  return (
    await axios.post(BASE_URL + "api/appointment/monthly", {
      user,
    })
  ).data.data;
};

export const fetchContacts = async (user) => {
  return await axios.post(BASE_URL + "api/contacts", { user });
};

export const fetchAppointmentDetailsById = async (user) => {
  return await axios.get(BASE_URL + `api/allAppointments/${user._id}`);
};

export const deleteAppointmentById = async (id) => {
  return await axios.delete(BASE_URL + `api/appointment/${id}`);
};

export const updateAppointmentDetailsById = async (appointmentDetails) => {
  return await axios.post(
    BASE_URL + `api/appointment/update/${appointmentDetails._id}`,
    {
      ...appointmentDetails,
    }
  );
};
