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

export const addPatient = async (patient: any) => {
  const data = await fetch("http://localhost:9001/api/patients", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  });
  return data;
};

export const deletePatient = async (id: string) => {
  const data = await fetch(`http://localhost:9001/api/patients/${id}`, {
    credentials: "include",
    method: "DELETE",
  });
  if (data.status === 200) {
    const updatedPatients = await fetchPatients();
    return updatedPatients;
  } else {
    if (data.status === 401) {
      window.location.href = "/login";
      throw new Error("User not authenticated");
    }
    throw new Error("Unable to Delete Patients");
  }
};

interface InvoiceItem {
  item: string;
  description: string;
  quantity: number;
  amount: number;
}

interface InvoiceData {
  doctorName: string;
  doctorNumber: string;
  doctorDesignation: string;
  doctorSubtext: string;
  patientId: string;
  patientName: string;
  items: InvoiceItem[];
  subtotal: number;
  invoice_nr: string;
}

export const downloadPdf = async (patient: any) => {
  console.log("Downloading", patient);
  
  // Transform patient data into invoice format
  const invoiceData: InvoiceData = {
    doctorName: "Dr. Sarah Wilson",
    doctorNumber: "DOC-2024-001",
    doctorDesignation: "Clinical Psychologist",
    doctorSubtext: "M.Phil in Clinical Psychology",
    patientId: patient._id,
    patientName: patient.name,
    items: [
      {
        item: "Consultation",
        description: patient.sessionDescription,
        quantity: 1,
        amount: patient.sessionPrice || 2500
      },
    ],
    subtotal: patient.sessionPrice || 10000, // Total of all sessions
    invoice_nr: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`
  };

  const data = await fetch(`http://localhost:9001/downloadpdf`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoiceData),
  });
  if (data.status === 200) {
    const blob = await data.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "patient-report.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    if (data.status === 401) {
      window.location.href = "/login";
      throw new Error("User not authenticated");
    }
    throw new Error("Unable to Download Patients");
  }
};
