// src/components/AddPatientForm.tsx
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
  const [errors, setErrors] = useState<{ id?: string; name?: string; age?: string; general?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    // 1) Field validations
    if (!id.trim()) newErrors.id = 'ID is required';
    if (!name.trim()) newErrors.name = 'Name is required';
    if (age !== '' && age < 0) newErrors.age = 'Age must be positive';

    // 2) Duplicate ID check
    if (!newErrors.id) {
      const all = await getAllPatients();
      if (all.some(p => p.id === id.trim())) {
        newErrors.id = `A patient with ID "${id.trim()}" already exists`;
      }
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    // 3) Attempt insertion
    try {
      await addPatient({ id: id.trim(), name: name.trim(), age: age === '' ? undefined : age });
      const updated = await getAllPatients();
      onAdded(updated);

      // reset form + errors
      setId('');
      setName('');
      setAge('');
      setErrors({});
    } catch (err: any) {
      setErrors({ general: err.message || 'Failed to register patient' });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-4"
    >
      {errors.general && (
        <div className="text-red-600 dark:text-red-400 font-medium">
          {errors.general}
        </div>
      )}
      <div className="flex flex-col space-y-1">
        <label className="text-gray-700 dark:text-gray-200">ID</label>
        <input
          className={`w-full border rounded-lg p-2 focus:outline-none ${
            errors.id 
              ? 'border-red-500 dark:border-red-400' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
          value={id}
          onChange={e => setId(e.target.value)}
        />
        {errors.id && <p className="text-red-600 dark:text-red-400 text-sm">{errors.id}</p>}
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-gray-700 dark:text-gray-200">Name</label>
        <input
          className={`w-full border rounded-lg p-2 focus:outline-none ${
            errors.name 
              ? 'border-red-500 dark:border-red-400' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-600 dark:text-red-400 text-sm">{errors.name}</p>}
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-gray-700 dark:text-gray-200">Age</label>
        <input
          type="number"
          className={`w-full border rounded-lg p-2 focus:outline-none ${
            errors.age 
              ? 'border-red-500 dark:border-red-400' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
          value={age}
          onChange={e => setAge(e.target.value === '' ? '' : Number(e.target.value))}
        />
        {errors.age && <p className="text-red-600 dark:text-red-400 text-sm">{errors.age}</p>}
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
