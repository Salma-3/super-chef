'use client'
import { deleteNutrition } from '@/app/lib/actions/recipes';
import { createNutritionSchema } from '@/app/lib/validations';
import { Nutrition } from '@prisma/client';
import React, { ChangeEvent, useState } from 'react'
import { z } from 'zod';

type Props = {
    handleChange: (list: z.infer<typeof createNutritionSchema>) => void,
    initValue: Nutrition[] | {name: string; value: string}[]
}

function NutritionInput({ handleChange, initValue }: Props) {
    const [list, setList] = useState<typeof initValue>(initValue)
    const [value, setValue] = useState('')
    

    const onKeyDown = (e: any) => {
        if((e as KeyboardEvent).key === 'Enter') {
            e.preventDefault()
            if(value){
                const [name, val] = value.split(':');
                let tmp = [...list, { name, value: val }]
                setList([...tmp])
                setValue('')
                handleChange(tmp)
            }
        }
        return false;
    }

    const onChange = (evt: ChangeEvent<HTMLInputElement>) => setValue(evt.target.value)

    const onRemove = async (index: number) => {
        const itm = list[index]
        if(Object.hasOwn(itm, 'id')) {
            // @ts-ignore
            await deleteNutrition(itm.id)
        }
        const tmp = list;
        tmp.splice(index, 1)
        setList([...tmp])
        handleChange(tmp)
    }

  return (
    <div>
        <label htmlFor="nutrition">Nutrition <span className="text-red-500">*</span></label>
        <input id='nutrition' type="text" value={value} onChange={onChange} onKeyDown={onKeyDown} className='border w-full px-2 py-1 rounded-lg focus:outline-none focus:border-primary'/>
        <small className='text-gray-500'>enter nutrition name and value saperated by : then press enter key.</small>

        {
            <table className="mt-3">
                <tbody>
                {
                    list.map((itm, index) => (
                        <tr key={itm.name}>
                            <th className='px-4 py-1 border bg-gray-100 text-left'>{itm.name}</th>
                            <td className='px-4 py-1 border'>{itm.value}</td>
                            <td className='px-4 py-1 border'>
                                <button type='button' onClick={() => onRemove(index)}>
                                    <span className="ti ti-close"></span>
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
                
            </table>
        }
    </div>
  )
}

export default NutritionInput