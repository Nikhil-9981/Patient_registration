import type { Patient } from '../entities/Patient';

interface Props {
  patients: Patient[];
}

export function PatientsList({ patients }: Props) {
  if (!patients.length) {
    return <div>No patients registered yet.</div>;
  }
  return (
    <ul className="p-4 border rounded space-y-1">
      {patients.map(p => (
        <li key={p.id}>
          <strong>{p.name}</strong> (ID: {p.id}) — Age: {p.age ?? 'N/A'}
        </li>
      ))}
    </ul>
  );
}
