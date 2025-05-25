// src/App.tsx
import  { useEffect, useState } from 'react';
import { AddPatientForm } from './components/AddPatientForm';
import { PatientsList } from './components/PatientsList';
import { getAllPatients } from './orm/repository';
import type { Patient } from './entities/Patient';

export default function App() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    (async () => {
      const all = await getAllPatients();
      setPatients(all);
    })();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 space-y-4">
      <h1 className="text-2xl font-bold">Patient Registration</h1>
      <AddPatientForm onAdded={setPatients} />
      <PatientsList patients={patients} />
    </div>
  );
}
