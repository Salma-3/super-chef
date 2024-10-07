import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import React from 'react'
import { z } from 'zod'
import { createImageSchema } from '@/app/lib/validations'

type Props = {
    onSuccess: (data: z.infer<typeof createImageSchema>) => void
}

function UploadWidget({ onSuccess }: Props) {
    const onUploaded = (result:  CloudinaryUploadWidgetResults) => {
        console.log('upload result', result)

        if(result.event === 'success' && typeof result.info === 'object'){
            const { secure_url, public_id, height, width } = result.info
         
            onSuccess({
                url: secure_url,
                publicId: public_id,
                height,
                width
            })
        }
        
    }

    return (
        <CldUploadWidget options={{ multiple: false, folder: 'superchef' }} signatureEndpoint='/api/sign-cloudinary-params' onSuccess={onUploaded} >
            {
                ({ open }) => (
                    <button type='button' onClick={() => open()} className='mt-3 mb-6 px-4  py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white'>
                       <span className="ti ti-upload"></span> Uplaod Image
                    </button>
                )
            }
        </CldUploadWidget>
    )
}

export default UploadWidget