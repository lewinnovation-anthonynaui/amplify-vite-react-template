import { useDispatch } from 'react-redux';

import asset from '../assets/asset.jpg';
import { assetsActions } from '../store';
import Button from './ui/Button';

export default function NoAssetSelected() {
  const dispatch = useDispatch();

  function onStartAddAsset() {
    dispatch(assetsActions.handleStartAddAsset());
  }
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        src={asset}
        alt="asset"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No asset selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select an asset or get started with a new one
      </p>
      <p className="mt-8">
        <Button onClick={onStartAddAsset}>Create new asset</Button>
      </p>
    </div>
  );
}
