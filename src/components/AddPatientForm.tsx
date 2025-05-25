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
    const updated = await getAllPatients();
    onAdded(updated);
    // reset
    setId('');
    setName('');
    setAge('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-2">
      <div>
        <label>ID:</label>
        <input
          type="text"
          value={id}
          onChange={e => setId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value === '' ? '' : Number(e.target.value))}
        />
      </div>
      <button type="submit">Register Patient</button>
    </form>
  );
}
