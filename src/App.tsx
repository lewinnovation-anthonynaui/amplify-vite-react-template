import { generateClient } from 'aws-amplify/data';
import { useEffect, useState } from 'react';

import { Schema } from '../amplify/data/resource';
import AssetsSideBar from './components/AssetsSideBar';
import NewAsset from './components/NewAsset';
import NoAssetSelected from './components/NoAssetSelected';
import SelectedAsset from './components/SelectedAsset';

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

export default function App() {
  const [assetsState, setAssetsState] = useState<{
    selectedAssetId?: string | null;
    assets: Array<Assets>;
    serviceHistories: Array<ServiceHistory>;
  }>({
    selectedAssetId: undefined,
    assets: [],
    serviceHistories: [],
  });

  useEffect(() => {
    client.models.Assets.observeQuery().subscribe({
      next: (data) => {
        setAssetsState((prevState) => {
          const inDbAssets: Assets[] = data.items.map((item) => {
            return {
              vehicle: item.vehicle || '',
              owner: item.owner || '',
              id: item.id,
            };
          });
          console.log('inDbAssets: ', inDbAssets);
          return {
            ...prevState,
            assets: inDbAssets,
          };
        });
      },
    });

    client.models.ServiceHistory.observeQuery().subscribe({
      next: (data) => {
        setAssetsState((prevState) => {
          const inDbServiceHistories: ServiceHistory[] = data.items.map(
            (item) => {
              return {
                service: item.service || '',
                assetId: item.assetId || '',
                id: item.id,
              };
            }
          );
          return {
            ...prevState,
            serviceHistories: inDbServiceHistories,
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

  async function handleAddAsset(assetData) {
    const asset = await client.models.Assets.create({
      vehicle: assetData.vehicle,
      owner: assetData.owner,
    });

    setAssetsState((prevState) => {
      const assetId = asset.data?.id;
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

  async function handleAddServiceHistory(serviceHistory: ServiceHistory) {
    const serHistory = await client.models.ServiceHistory.create({
      assetId: assetsState.selectedAssetId,
      service: serviceHistory.service,
    });
    console.log('serHistory: ', serHistory);
    setAssetsState((prevState) => {
      const newServiceHistory: ServiceHistory = {
        service: serviceHistory.service,
        assetId: prevState.selectedAssetId || undefined,
        id: serviceHistory.id,
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

  // if (!selectedAsset) return <div>bug !selectedAsset</div>;

  if (assetsState.selectedAssetId)
    content = (
      <SelectedAsset
        asset={selectedAsset!}
        onDelete={handleDeleteAsset}
        onAddServiceHistory={handleAddServiceHistory}
        onDeleteServiceHistory={handleDeleteServiceHistory}
        serviceHistories={assetsState.serviceHistories}
      />
    );

  // if (!assetsState.selectedAssetId)
  //   return <div>bug !assetsState.selectedAssetId</div>;

  return (
    <main className="h-screen my-8 flex gap-8">
      <AssetsSideBar
        onStartAddAsset={handleStartAddAsset}
        assets={assetsState.assets}
        onSelectAsset={handleSelectAsset}
        selectedAssetId={assetsState.selectedAssetId || ''}
      />
      {content}
    </main>
  );
}
