import { Schema } from '../../amplify/data/resource';
import NewServiceHistory from './NewServiceHistory';

interface Props {
  onAdd: (serviceHistory: Partial<Schema['ServiceHistory']['type']>) => void;
  onDelete: (id?: string) => void;
  serviceHistories: Array<Partial<Schema['ServiceHistory']['type']>>;
}

export default function ServiceHistories({
  serviceHistories,
  onAdd,
  onDelete,
}: Props) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">
        Service Histories
      </h2>
      <NewServiceHistory onAdd={onAdd} />
      {serviceHistories.length === 0 && (
        <p className="text-stone-800 mt-4">
          This asset doesn't have any service history yet.
        </p>
      )}
      {serviceHistories.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-200">
          {serviceHistories.map((serviceHistory) => {
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
