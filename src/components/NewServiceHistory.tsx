import { useState } from 'react';

import { ServiceHistory } from '../App';

interface Props {
  onAdd: (serviceHistory: ServiceHistory) => void;
}

export default function NewServiceHistory({ onAdd }: Props) {
  const [serviceHistory, setServiceHistory] = useState<string>('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setServiceHistory(event.target.value);
  }

  function handleClick() {
    onAdd({ service: serviceHistory });
    setServiceHistory('');
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={serviceHistory}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Service History
      </button>
    </div>
  );
}
