// src/App.tsx
import { useEffect, useState } from 'react';
import { AddPatientForm } from './components/AddPatientForm';
import { PatientsList } from './components/PatientsList';
import { DarkModeToggle } from './components/DarkModeToggle';
import { getAllPatients } from './orm/repository';
import type { Patient } from './entities/Patient';

export default function App() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    (async () => setPatients(await getAllPatients()))();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Patient Registration</h1>
          <DarkModeToggle />
        </div>
        <AddPatientForm onAdded={setPatients} />
        <div className="mt-6">
          <PatientsList patients={patients} onChange={setPatients} />
        </div>
      </div>
    </div>
  );
}
