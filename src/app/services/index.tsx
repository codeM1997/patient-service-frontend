export const loginRequest = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const loginReq = await fetch("http://localhost:9001/api/auth", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  return loginReq.json();
};

export const fetchPatients = async () => {
  const data = await fetch("http://localhost:9001/api/patients", {
    credentials: "include",
  });
  if (data.status === 200) {
    return data.json();
  } else {
    if (data.status === 401) {
      throw new Error("User not authenticated");
    }
    throw new Error("Unable to Fetch Patients");
  }
};
