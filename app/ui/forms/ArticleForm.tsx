'use client'
import React, { useState } from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor';
import { createArticle } from '@/app/lib/actions/blog';
import { useRouter } from 'next/navigation';
import UploadWidget from './UploadWidget';
import { z } from 'zod';
import { createImageSchema } from '@/app/lib/validations';
import { CldImage } from 'next-cloudinary';


const mdStr = `
### Markdown Test
A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

type Props = {
  authorId: number
}

function ArticleForm({ authorId }: Props) {
  if(document) document.documentElement.setAttribute('data-color-mode', 'light')
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [markdown, setMarkdown] = useState(mdStr)
  const [coverImage, setCoverImage] = useState<z.infer<typeof createImageSchema> | null>(null)
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

    const result = await createArticle({
      title, 
      body: markdown,
      authorId
    }, coverImage)

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
  
  return (
    <div className='w-full px-3 my-12 md:max-w-[1000px]'>
      <p className="text-red-500">{error.message}</p>
      <div className="mb-3">
        <label htmlFor="title">Title <span className="text-red-500">*</span></label>
        <input type="text" name="title" id="title" placeholder='Title' value={title} onChange={evt => setTitle(evt.target.value)} className="w-full p-1 px-2 border rounded-lg focus:outline-none focus:border-primary" />
        { error.fieldErrors?.title && <small className='text-red-500'>{error.fieldErrors.title.join(',')}</small>}
      </div>
      <div className="mb-3">
        <UploadWidget onSuccess={onSuccess}/>
        {error.fieldErrors?.image && <small className='text-red-500'>{error.fieldErrors.image.join(',')}</small>}
      </div>
      <div className='mb-3'>
        {coverImage && <CldImage src={coverImage.url} height={coverImage.height} width={coverImage.width} alt='newly uploaded'/>}
      </div>
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