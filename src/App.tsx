import { useEffect, useState, useMemo } from 'react';
import { AddPatientForm } from './components/AddPatientForm';
import { PatientsList } from './components/PatientsList';
import { DarkModeToggle } from './components/DarkModeToggle';
import { getAllPatients } from './orm/repository';
import type { Patient } from './entities/Patient';

const PAGE_SIZE = 10;

export default function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setPatients(await getAllPatients());
    })();
  }, []);

  const pageCount = Math.ceil(patients.length / PAGE_SIZE);

  const currentPatients = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return patients.slice(start, start + PAGE_SIZE);
  }, [patients, page]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Patient Registration</h1>
          <DarkModeToggle />
        </div>

        <AddPatientForm onAdded={setPatients} />

        <div className="mt-6">
          <PatientsList patients={currentPatients} onChange={setPatients} />
        </div>

        {/* Pagination controls */}
        {pageCount > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map(pn => (
              <button
                key={pn}
                onClick={() => setPage(pn)}
                className={`px-3 py-1 rounded ${
                  pn === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-800'
                }`}
              >
                {pn}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
