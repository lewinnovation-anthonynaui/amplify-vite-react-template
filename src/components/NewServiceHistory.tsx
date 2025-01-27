import { generateClient } from 'aws-amplify/data';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Schema } from '../../amplify/data/resource';
import { AssetsState, ServiceHistory } from '../App';
import { assetsActions } from '../store';

const client = generateClient<Schema>();

export default function NewServiceHistory() {
  const [serviceHistory, setServiceHistory] = useState<string>('');
  const dispatch = useDispatch();
  const assetsState = useSelector((state: AssetsState) => state.assets);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setServiceHistory(event.target.value);
  }

  async function onAdd(serviceHistory: ServiceHistory) {
    const { data } = await client.models.ServiceHistory.create(serviceHistory);
    const newServiceHistory: ServiceHistory = {
      service: data?.service || '',
      id: data?.id || '',
      assetId: data?.assetId || '',
    };
    dispatch(assetsActions.handleAddServiceHistory(newServiceHistory));
  }

  function handleClick() {
    onAdd({
      service: serviceHistory,
      assetId: assetsState.selectedAssetId!,
    });
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
