'use client'
import React, { ChangeEvent, useState } from 'react'

type Props = {
    handleChange: (list: string[], name: string) => void;
    inputType?: 'input' | 'textarea';
    label: string;
    name: string;
    initValue: string[]
}

function ListInput({ handleChange, inputType, label, name, initValue }: Props) {

    const [value, setValue] = useState('')
    const [list, setList] = useState<string[]>(initValue)

    const onKeyPress = (evt: any) => {
      if((evt as KeyboardEvent).key === 'Enter') {
        evt.preventDefault()
        if(value){
            let tmp = [...list, value]
            setList(tmp)
            setValue('')
            handleChange(tmp, name)
        }  
      }
      return false;

    } 
    const onChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(evt.target.value)

    const onRemove = (evt: any) => {
        let tmp = list
        const trg = evt.currentTarget as HTMLButtonElement
        const index = Number(trg.getAttribute('data-index'))
        console.log(index)
        tmp.splice(index, 1)
        setList([...tmp])
        handleChange(tmp, name)
    }

  return (
    <div>
        <label htmlFor={`${label}-input`}>{label} <span className='text-red-500'>*</span></label>
        {
            inputType === 'textarea' ? (
                <textarea id={`${label}-input`} onChange={onChange} onKeyDown={onKeyPress} value={value} className="border w-full px-2 py-1 rounded-lg focus:outline-none focus:border-primary"></textarea>
            ) : (
                <input type="text" onChange={onChange} onKeyDown={onKeyPress} value={value} className="border w-full px-2 py-1 rounded-lg focus:outline-none focus:border-primary" />
            )
        }
        <small className="text-gray-500">press enter key after every item</small>
        <ul className='my-3'>
            {
                list.map((item, index) => (
                    <li className='mb-2 bg-gray-100 p-2 px-4' key={`${label}-${item}`}>
                        {item}

                        <button type="button" data-index={index} onClick={onRemove} className='float-end'>
                            <span className="ti ti-close"></span>
                        </button>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default ListInput