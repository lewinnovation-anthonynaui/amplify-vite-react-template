import { generateClient } from 'aws-amplify/data';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Schema } from '../amplify/data/resource';
import AssetsSideBar from './components/AssetsSideBar';
import NewAsset from './components/NewAsset';
import NoAssetSelected from './components/NoAssetSelected';
import SelectedAsset from './components/SelectedAsset';
import { assetsActions } from './store';

const client = generateClient<Schema>();

export interface Assets {
  id?: string;
  vehicle: string;
  owner: string;
}

export interface ServiceHistory {
  id?: string;
  assetId?: string;
  service: string;
}

export interface AssetsState {
  assets: {
    selectedAssetId?: string | null;
    assets: Array<Assets>;
    serviceHistories: Array<ServiceHistory>;
  };
}

export default function App() {
  const assetsState = useSelector((state: AssetsState) => state.assets);
  const dispatch = useDispatch();

  useEffect(() => {
    client.models.Assets.observeQuery().subscribe({
      next: (data) => {
        const serializableItems: Assets[] = data.items.map((item) => ({
          vehicle: item.vehicle || '',
          owner: item.owner || '',
          id: item.id,
        }));
        dispatch(assetsActions.handleAssetsStart(serializableItems));
      },
    });

    client.models.ServiceHistory.observeQuery().subscribe({
      next: (data) => {
        const serializableItems: ServiceHistory[] = data.items.map((item) => ({
          service: item.service || '',
          id: item.id,
          assetId: item.assetId || '',
        }));
        dispatch(assetsActions.handleServiceHistoryStart(serializableItems));
      },
    });
  }, [dispatch]);

  let content: JSX.Element = <NoAssetSelected />;
  if (assetsState.selectedAssetId === null) content = <NewAsset />;
  if (assetsState.selectedAssetId) content = <SelectedAsset />;
  return (
    <main className="h-screen my-8 flex gap-8">
      <AssetsSideBar />
      {content}
    </main>
  );
}
