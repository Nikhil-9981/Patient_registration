// src/components/PatientsList.tsx
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
    setEditingId(p.id);
    setEditName(p.name);
    setEditAge(p.age ?? '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditAge('');
  };

  const saveEdit = async (id: string) => {
    await updatePatient(id, {
      name: editName,
      age: editAge === '' ? undefined : editAge,
    });
    const updated = await getAllPatients();
    onChange(updated);
    cancelEdit();
  };

  const remove = async (id: string) => {
    await deletePatient(id);
    const updated = await getAllPatients();
    onChange(updated);
  };

  if (!patients.length) {
    return <div>No patients registered yet.</div>;
  }

  return (
    <ul className="p-4 border rounded space-y-2">
      {patients.map(p => (
        <li key={p.id} className="flex items-center justify-between">
          {editingId === p.id ? (
            <div className="flex-1 space-x-2">
              <input
                className="border px-2 py-1"
                value={editName}
                onChange={e => setEditName(e.target.value)}
              />
              <input
                className="border px-2 py-1 w-20"
                type="number"
                value={editAge}
                onChange={e =>
                  setEditAge(e.target.value === '' ? '' : Number(e.target.value))
                }
              />
            </div>
          ) : (
            <div className="flex-1">
              <strong>{p.name}</strong> (ID: {p.id}) — Age: {p.age ?? 'N/A'}
            </div>
          )}

          <div className="space-x-2">
            {editingId === p.id ? (
              <>
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => saveEdit(p.id)}
                >
                  Save
                </button>
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => startEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => remove(p.id)}
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
