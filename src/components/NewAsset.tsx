import { generateClient } from 'aws-amplify/data';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Schema } from '../../amplify/data/resource';
import { Assets } from '../App';
import { assetsActions } from '../store';
import Input from './ui/Input';
import Modal from './ui/Modal';

const client = generateClient<Schema>();

export default function NewAsset() {
  const modalRef = useRef<HTMLDialogElement>();
  const vehicleRef = useRef<HTMLInputElement>();
  const ownerRef = useRef<HTMLInputElement>();

  const dispatch = useDispatch();

  async function onAdd(assets: Assets) {
    const { data } = await client.models.Assets.create(assets);
    const newAssets = {
      vehicle: data?.vehicle,
      owner: data?.owner,
      id: data?.id,
    };
    dispatch(assetsActions.handleAddAsset(newAssets));
  }

  function onCancel() {
    dispatch(assetsActions.handleCancelAddAsset());
  }

  function handleSave() {
    const enteredVehicle = vehicleRef.current?.value || '';
    const enteredOwnerRef = ownerRef.current?.value || '';

    if (enteredVehicle.trim() === '' || enteredOwnerRef.trim() === '') {
      modalRef.current?.showModal();
      return;
    }

    onAdd({
      vehicle: enteredVehicle,
      owner: enteredOwnerRef,
    });
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
