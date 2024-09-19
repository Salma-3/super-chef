import clsx from 'clsx';
import React from 'react'

type Props = {
    children: React.ReactNode;
    open: boolean;
    handleModal: () => void;
    defaultHeader?: boolean;
    title?: string;
}



function Modal({ children, handleModal, open, title, defaultHeader }: Props) {
  return (
    <div className={clsx('fixed shadow-lg w-fit mx-auto left-6 right-6 z-10  overflow-hidden transition-all duration-500 ease-in-out', open ? 'top-[200px]' : 'top-[-500px]')}>
        {defaultHeader && <div className="flex px-2 py-3 justify-between bg-primary text-white">
            <h5>{title}</h5>
            <button onClick={handleModal} type="button" className="text-white">
                <span className="ti ti-close"></span>
            </button>
        </div>}

        <div className='bg-white p-5'>
            {children}
        </div>
    </div>
  )
}

export default Modal