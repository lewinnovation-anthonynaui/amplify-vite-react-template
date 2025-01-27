import { useRef } from 'react';

import { Schema } from '../../amplify/data/resource';
import Input from './Input';
import Modal from './Modal';

interface Props {
  onAdd: (asset: Partial<Schema['Assets']['type']>) => void;
  onCancel: () => void;
}

export default function NewAsset({ onAdd, onCancel }: Props) {
  const modalRef = useRef<HTMLDialogElement>();
  const vehicleRef = useRef<HTMLInputElement>();
  const ownerRef = useRef<HTMLInputElement>();

  function handleSave() {
    const enteredVehicle = vehicleRef.current?.value || '';
    const enteredOwnerRef = ownerRef.current?.value || '';

    if (enteredVehicle.trim() === '' || enteredOwnerRef.trim() === '') {
      modalRef.current?.showModal();
      return;
    }

    onAdd({ vehicle: enteredVehicle, owner: enteredOwnerRef });
  }

  return (
    <>
      <Modal ref={modalRef} buttonCaption="Close">
        <h2 className="text-xl font-bold text-stone-500 my-4">
          Invalid inputs
        </h2>
        <p className="text-stone-400 mb-4">
          Oops...looks like you forgot to enter a value.
        </p>
        <p className="text-stone-400 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={vehicleRef} label="Vehicle" />
          <Input type="text" ref={ownerRef} label="Owner" />
        </div>
      </div>
    </>
  );
}
