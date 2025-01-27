import { generateClient } from 'aws-amplify/data';
import { useDispatch, useSelector } from 'react-redux';

import { Schema } from '../../amplify/data/resource';
import { AssetsState } from '../App';
import { assetsActions } from '../store';
import NewServiceHistory from './NewServiceHistory';

const client = generateClient<Schema>();

export default function ServiceHistories() {
  const dispatch = useDispatch();
  const { serviceHistories, selectedAssetId } = useSelector(
    (state: AssetsState) => state.assets
  );

  async function onDelete(id?: string) {
    const { data } = await client.models.ServiceHistory.delete({ id: id! });
    dispatch(assetsActions.handleDeleteServiceHistory(data?.id));
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">
        Service Histories
      </h2>
      <NewServiceHistory />
      {serviceHistories.length === 0 && (
        <p className="text-stone-800 mt-4">
          This asset doesn't have any service history yet.
        </p>
      )}
      {serviceHistories.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-200">
          {serviceHistories.map((serviceHistory) => {
            if (serviceHistory?.assetId !== selectedAssetId) return null;
            return (
              <li
                key={serviceHistory?.id}
                className="flex justify-between my-4"
              >
                <span>{serviceHistory?.service}</span>
                <button
                  className="text-stone-700 hover:text-red-500"
                  onClick={() => onDelete(serviceHistory?.id)}
                >
                  Clear
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
