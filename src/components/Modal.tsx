import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';

import Button from './Button';

interface Props {
  children?: ReactNode;
  buttonCaption: string;
}

const Modal = forwardRef(function Modal(
  { children, buttonCaption }: Props,
  ref
) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      ...dialogRef.current!,
      showModal: () => dialogRef.current?.showModal(),
    };
  });

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    modalRoot
  );
});

export default Modal;
