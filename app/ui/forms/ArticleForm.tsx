'use client'
import React, { useEffect, useState } from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor';
import { createArticle, updateArticle } from '@/app/lib/actions/blog';
import { useRouter } from 'next/navigation';
import UploadWidget from './UploadWidget';
import { z } from 'zod';
import { createImageSchema } from '@/app/lib/validations';
import { CldImage } from 'next-cloudinary';
import { ArticleWithImage } from '@/app/lib/definitions';
import axios from 'axios';
import { deleteImageFromDb } from '@/app/lib/actions/recipes';
import { LeavingDialog } from '../LeavingDialog';
import { PreventNavigation } from '../PreventNavigation';


type Props = {
  authorId: number,
  articleData?: ArticleWithImage
}

function ArticleForm({ authorId, articleData }: Props) {
  const checkbefore = () => {
    console.log('route change !!')
    window.alert('No route changing')
    throw new Error('route change aborted')
  }
  useEffect(() => {
    window.addEventListener('beforeunload',checkbefore);
    return () => {
      window.removeEventListener('beforeunload', checkbefore);
    };
  });
  if(document) document.documentElement.setAttribute('data-color-mode', 'light')
  const router = useRouter()
  const [title, setTitle] = useState(articleData?.title || '')
  const [markdown, setMarkdown] = useState(articleData?.body || '')
  const [coverImage, setCoverImage] = useState<z.infer<typeof createImageSchema> | null>(articleData?.image || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<{ fieldErrors: any, message: string }>({
    fieldErrors: {},
    message: '',
  })
  const onChange = (val: string, viewUpdate: any) => setMarkdown(val);
  
  const onSubmit = async () => {
    setLoading(true);

    if(!coverImage) {
      setError({...error, fieldErrors: { image: ['You must add cover image']}})
      setLoading(false)
      return;
    }

    let result;
    if(!articleData) {
      result = await createArticle({
        title, 
        body: markdown,
        authorId
      }, coverImage)

    } else {
      result = await updateArticle(articleData.id, { 
        title,
        body: markdown, 
        authorId,
      }, coverImage)
    }

    
    if(!result.success) {
      setError({
        ...error, 
        message: result.message || '',
        fieldErrors: result.errors
      })
      setLoading(false)
      return;
    }

    console.log('result', result)
    router.push(`/blog/${result.article?.slug}`)

  }

  const onSuccess = (imgData: z.infer<typeof createImageSchema>) => {
    setCoverImage(imgData)
  }

  const onDeleteImage = async () => {
    if(!coverImage) return;
    const res = await axios.post('/api/delete-images', JSON.stringify({ publicId: coverImage.publicId }), { headers: {"Content-Type": 'application/json'}})
    console.log(res)
    if(coverImage.id) {
      await deleteImageFromDb(coverImage.id)
    }
    setCoverImage(null)
  }

  const resetData = async () => {
    if(coverImage && !coverImage.id) {
      await onDeleteImage()
    }
  }
  
  return (
    <div className='w-full px-3 my-12 md:max-w-[1000px]'>
      <PreventNavigation isDirty={Boolean(coverImage && !coverImage.id)} backHref='/profile' resetData={resetData} />
      <p className="text-red-500">{error.message}</p>
      <div className="mb-3">
        <label htmlFor="title">Title <span className="text-red-500">*</span></label>
        <input type="text" name="title" id="title" placeholder='Title' value={title} onChange={evt => setTitle(evt.target.value)} className="w-full p-1 px-2 border rounded-lg focus:outline-none focus:border-primary" />
        { error.fieldErrors?.title && <small className='text-red-500'>{error.fieldErrors.title.join(',')}</small>}
      </div>
      <div className="mb-3">
        <UploadWidget disabled={!!coverImage} onSuccess={onSuccess}/>
        {error.fieldErrors?.image && <small className='text-red-500'>{error.fieldErrors.image.join(',')}</small>}
      </div>
     {coverImage && 
     <div className='group mb-3 relative w-fit'>
        <div className='absolute inset-0 group-hover:bg-black/50'></div>
        <button type="button" onClick={onDeleteImage} className='hidden absolute z-10 top-[40%] left-[45%] px-3 py-1 bg-red-500 text-white group-hover:block hover:bg-red-600'>
          <span className="ti ti-trash"></span>
        </button>
        <CldImage src={coverImage.url} height={coverImage.height} width={coverImage.width} alt='newly uploaded'/>
      </div>
      }
      <label htmlFor="body">Body <span className="text-red-500">*</span></label>
      <MarkdownEditor value={markdown} onChange={onChange} height='500px' className='border' theme='light' width='100%' />
      { error.fieldErrors?.body && <small className='text-red-500'>{error.fieldErrors.body.join(',')}</small>}

      <button disabled={loading} onClick={onSubmit} type="button" className='w-full my-6 px-4 py-2 uppercase bg-primary text-white hover:bg-darkorange disabled:opacity-50'>
        { loading  ? 'Posting...' : 'Post'}
      </button>
    </div>
  )
}

export default ArticleForm