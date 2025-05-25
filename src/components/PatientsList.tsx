import { useState } from 'react';
import type { Patient } from '../entities/Patient';
import { getAllPatients, updatePatient, deletePatient } from '../orm/repository';

interface Props {
  patients: Patient[];
  onChange: (patients: Patient[]) => void;
}

export function PatientsList({ patients, onChange }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState<number | ''>('');

  const startEdit = (p: Patient) => {
    setEditingId(p.id); setEditName(p.name); setEditAge(p.age ?? '');
  };
  const cancelEdit = () => setEditingId(null);

  const saveEdit = async (id: string) => {
    await updatePatient(id, { name: editName, age: editAge === '' ? undefined : editAge });
    onChange(await getAllPatients());
    cancelEdit();
  };
  const remove = async (id: string) => onChange(await deletePatient(id).then(() => getAllPatients()));

  if (!patients.length) {
    return <div className="text-center py-4 text-gray-500">No patients registered yet.</div>;
  }

  return (
    <ul className="space-y-4">
      {patients.map(p => (
        <li 
          key={p.id} 
          className="flex items-center justify-between bg-white dark:bg-gray-800 shadow rounded-xl p-4 hover:shadow-lg transition"
        >
          {editingId === p.id ? (
            <div className="flex-1 flex space-x-2">
              <input
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 focus:ring-2 focus:ring-blue-400"
                value={editName}
                onChange={e => setEditName(e.target.value)}
              />
              <input
                type="number"
                className="w-20 border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-gray-700 focus:ring-2 focus:ring-blue-400"
                value={editAge}
                onChange={e =>
                  setEditAge(e.target.value === '' ? '' : Number(e.target.value))
                }
              />
            </div>
          ) : (
            <div className="flex-1 text-gray-800 dark:text-gray-100">
              <span className="font-semibold">{p.name}</span> (ID: {p.id}) — Age: {p.age ?? 'N/A'}
            </div>
          )}

          <div className="flex space-x-2">
            {editingId === p.id ? (
              <>
                <button
                  onClick={() => saveEdit(p.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => startEdit(p)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
