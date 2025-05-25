import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function DarkModeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

    useEffect(() => {
    const root = document.documentElement;       // <html> element
    if (dark) root.classList.add('dark');
    else      root.classList.remove('dark');
    localStorage.theme = dark ? 'dark' : 'light';
    }, [dark]);


  return (
    <button
      onClick={() => setDark(d => !d)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      {dark ? <Sun className="w-5 h-5 text-yellow-500" /> 
            : <Moon className="w-5 h-5 text-gray-800" />}
    </button>
  );
}
