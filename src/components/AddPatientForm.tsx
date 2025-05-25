import React, { useState } from 'react';
import { addPatient, getAllPatients } from '../orm/repository';
import type { Patient } from '../entities/Patient';

interface Props {
  onAdded: (patients: Patient[]) => void;
}

export function AddPatientForm({ onAdded }: Props) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !name) return;
    await addPatient({ id, name, age: age === '' ? undefined : age });
    onAdded(await getAllPatients());
    setId(''); setName(''); setAge('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-4"
    >
      <div className="flex flex-col space-y-1">
        <label className="text-gray-700 dark:text-gray-200">ID</label>
        <input
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
          value={id}
          onChange={e => setId(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-gray-700 dark:text-gray-200">Name</label>
        <input
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-gray-700 dark:text-gray-200">Age</label>
        <input
          type="number"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
          value={age}
          onChange={e => setAge(e.target.value === '' ? '' : Number(e.target.value))}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
      >
        Register Patient
      </button>
    </form>
  );
}
