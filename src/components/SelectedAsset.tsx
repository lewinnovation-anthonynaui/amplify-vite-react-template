import { generateClient } from 'aws-amplify/data';
import { useDispatch, useSelector } from 'react-redux';

import { Schema } from '../../amplify/data/resource';
import { AssetsState } from '../App';
import { assetsActions } from '../store';
import ServiceHistories from './ServiceHistories';

const client = generateClient<Schema>();

export default function SelectedAsset() {
  const dispatch = useDispatch();
  const { assets, selectedAssetId } = useSelector(
    (state: AssetsState) => state.assets
  );

  const asset = assets.find((asset) => asset.id === selectedAssetId);

  async function onDelete(id?: string) {
    const { data } = await client.models.Assets.delete({ id: id! });
    dispatch(assetsActions.handleDeleteAsset(data?.id));
  }

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {asset?.vehicle} - {asset?.owner}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={() => onDelete(asset?.id)}
          >
            DELETE
          </button>
        </div>
      </header>
      <ServiceHistories />
    </div>
  );
}
