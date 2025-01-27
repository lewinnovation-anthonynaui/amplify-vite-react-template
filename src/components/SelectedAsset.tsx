import { Assets, ServiceHistory } from '../App';
import ServiceHistories from './ServiceHistories';

interface Props {
  asset: Assets;
  onDelete: (assetId?: string) => void;
  onAddServiceHistory: (serviceHistory: ServiceHistory) => void;
  onDeleteServiceHistory: (id?: string) => void;
  serviceHistories: Array<ServiceHistory>;
}

export default function SelectedAsset({
  asset,
  onDelete,
  onAddServiceHistory,
  onDeleteServiceHistory,
  serviceHistories,
}: Props) {
  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {asset?.vehicle} - {asset?.owner}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={() => onDelete(asset.id)}
          >
            DELETE
          </button>
        </div>
      </header>
      <ServiceHistories
        onAdd={onAddServiceHistory}
        onDelete={onDeleteServiceHistory}
        serviceHistories={serviceHistories}
      />
    </div>
  );
}
