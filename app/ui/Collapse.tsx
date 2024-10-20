'use client'

type Props = {
    isOpen: boolean;
    children: React.ReactNode;
}

export default function Collapse({  children, isOpen }: Props) {

  return (

    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-100' : 'max-h-0'
        }`}
    >
      {children}
    </div>
  );
}
