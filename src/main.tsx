import './db'; // ensures your PGlite code runs on startup
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'reflect-metadata';
import { getEntityMetadata } from './orm/metadata';
import { Patient } from './entities/Patient';
import { addPatient, getAllPatients } from './orm/repository';

(async () => {
  await addPatient({ id: 'p1', name: 'Alice', age: 30 });
  console.log(await getAllPatients());
})();

console.log(getEntityMetadata(Patient));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
