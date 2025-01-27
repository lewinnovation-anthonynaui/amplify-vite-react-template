import { generateClient } from 'aws-amplify/data';
import { useEffect, useState } from 'react';

import { Schema } from '../amplify/data/resource';
import AssetsSideBar from './components/AssetsSideBar';
import NewAsset from './components/NewAsset';
import NoAssetSelected from './components/NoAssetSelected';
import SelectedAsset from './components/SelectedAsset';

const client = generateClient<Schema>();

export default function App() {
  const [assetsState, setAssetsState] = useState<{
    selectedAssetId: string | undefined | null;
    assets: Array<Partial<Schema['Assets']['type']>>;
    serviceHistories: Array<Partial<Schema['ServiceHistory']['type']>>;
  }>({
    selectedAssetId: undefined,
    assets: [],
    serviceHistories: [],
  });

  useEffect(() => {
    client.models.Assets.observeQuery().subscribe({
      next: (data) => {
        setAssetsState((prevState) => {
          return {
            ...prevState,
            assets: [...data.items],
          };
        });
      },
    });

    client.models.ServiceHistory.observeQuery().subscribe({
      next: (data) => {
        setAssetsState((prevState) => {
          return {
            ...prevState,
            serviceHistories: [...data.items],
          };
        });
      },
    });
  }, []);

  console.log('assetsState: ', assetsState);

  function handleStartAddAsset() {
    setAssetsState((prevState) => {
      return {
        ...prevState,
        selectedAssetId: null,
      };
    });
  }

  function handleCancelAddAsset() {
    setAssetsState((prevState) => {
      return {
        ...prevState,
        selectedAssetId: undefined,
      };
    });
  }

  function handleAddAsset(assetData) {
    setAssetsState((prevState) => {
      const assetId = Math.random().toString();
      const newAsset = {
        ...assetData,
        id: assetId,
      };
      return {
        ...prevState,
        selectedAssetId: undefined,
        assets: [...prevState.assets, newAsset],
      };
    });
  }

  function handleSelectAsset(assetId?: string) {
    setAssetsState((prevState) => {
      return {
        ...prevState,
        selectedAssetId: assetId,
      };
    });
  }

  function handleDeleteAsset(assetId: string | undefined | null) {
    setAssetsState((prevState) => {
      return {
        ...prevState,
        selectedAssetId: undefined,
        assets: prevState.assets.filter((asset) => asset.id !== assetId),
      };
    });
  }

  function handleAddServiceHistory(
    serviceHistory: Partial<Schema['ServiceHistory']['type']>
  ) {
    setAssetsState((prevState) => {
      const newServiceHistory: Partial<Schema['ServiceHistory']['type']> = {
        service: serviceHistory.service,
        assetId: prevState.selectedAssetId,
        id: '',
        createdAt: '',
        updatedAt: '',
      };
      return {
        ...prevState,
        serviceHistories: [...prevState.serviceHistories, newServiceHistory],
      };
    });
  }

  function handleDeleteServiceHistory(id?: string) {
    setAssetsState((prevState) => {
      return {
        ...prevState,
        serviceHistories: prevState.serviceHistories.filter(
          (serviceHistory) => serviceHistory.id !== id
        ),
      };
    });
  }

  let content: JSX.Element = (
    <NoAssetSelected onStartAddAsset={handleStartAddAsset} />
  );

  if (assetsState.selectedAssetId === null)
    content = (
      <NewAsset onAdd={handleAddAsset} onCancel={handleCancelAddAsset} />
    );

  const selectedAsset = assetsState.assets.find(
    (asset) => asset.id === assetsState.selectedAssetId
  );

  if (!selectedAsset) return <div>bug !selectedAsset</div>;

  if (assetsState.selectedAssetId)
    content = (
      <SelectedAsset
        asset={selectedAsset}
        onDelete={handleDeleteAsset}
        onAddServiceHistory={handleAddServiceHistory}
        onDeleteServiceHistory={handleDeleteServiceHistory}
        serviceHistories={assetsState.serviceHistories}
      />
    );

  if (!assetsState.selectedAssetId)
    return <div>bug !assetsState.selectedAssetId</div>;

  return (
    <main className="h-screen my-8 flex gap-8">
      <AssetsSideBar
        onStartAddAsset={handleStartAddAsset}
        assets={assetsState.assets}
        onSelectAsset={handleSelectAsset}
        selectedAssetId={assetsState.selectedAssetId}
      />
      {content}
    </main>
  );
}
