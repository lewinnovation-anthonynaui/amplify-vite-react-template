import { useDispatch, useSelector } from 'react-redux';

import { AssetsState } from '../App';
import { assetsActions } from '../store';
import Button from './ui/Button';

export default function AssetsSideBar() {
  const dispatch = useDispatch();

  const { assets, selectedAssetId } = useSelector(
    (state: AssetsState) => state.assets
  );

  function onStartAddAsset() {
    dispatch(assetsActions.handleStartAddAsset());
  }

  function onSelectAsset(assetId?: string) {
    dispatch(assetsActions.handleSelectAsset(assetId));
  }

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Assets
      </h2>
      <div>
        <Button onClick={onStartAddAsset}>+ Add asset</Button>
      </div>
      <ul className="mt-8">
        {assets.map((asset) => {
          let cssClasses =
            'w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800';
          if (asset.id === selectedAssetId)
            cssClasses += ' bg-stone-800 text-stone-200';
          else cssClasses += ' text-stone-400';

          return (
            <li key={asset.id}>
              <button
                className={cssClasses}
                onClick={() => onSelectAsset(asset.id)}
              >
                {asset.vehicle} - {asset.owner}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
