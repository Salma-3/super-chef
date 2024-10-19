'use client';
import React, { useEffect, useState } from 'react'
import Modal from '../Modal';
import { HeartIcon } from './RecipeItem';
import { useSession } from 'next-auth/react';
import { favorite, unfavorite } from '@/app/lib/actions/recipes';
import toast from 'react-hot-toast';



type Props = {
  recipeId: number
}

function Buttons({ recipeId }: Props) {
  const [activeSave, setActive] = useState(false)
  const [isFavorite, setFavorite] = useState(false)
  const session = useSession()
  const user = session.data?.user
    
  useEffect(() => {
    if(user && user.favorites.includes(recipeId)) {
      setFavorite(true)
    }
  }, [session, recipeId])

    
    console.log(user)

    const [modalOpen, setOpenModal] = useState(false)
    const handleModal = () => setOpenModal(!modalOpen)

    const handleCopyLink = () => {
      navigator.clipboard.writeText(window.location.href)
      toast.success('copied!')
      return;
    }

    

    const onHoverSave = () => {
      setActive(!activeSave)
    }

    const onClickSave = async () => {
      if(!user) {
        toast.error('You need to sign in')
        return;
      }
      if(isFavorite) {
        setFavorite(false)
        await unfavorite(recipeId, user.id)
        session.update({
          ...user,
          favorites: user.favorites.filter(id => id !== recipeId)
        })
        toast.success('unsaved')
        
      }else {
        setFavorite(true)
        await favorite(recipeId, user.id)
        session.update({
          ...user,
          user: {
            favorites: [...user.favorites, recipeId]
          }
        })
        toast.success('saved!')
      }
      return;
    }



    return (
        <div className='mb-4 relative'>
            <button onClick={onClickSave} onMouseEnter={onHoverSave} onMouseLeave={onHoverSave} className="px-4 py-2 mb-2 rounded-lg me-2 bg-primary text-white border border-primary">
                {isFavorite ? 'Saved' : 'Save'} <HeartIcon filled={activeSave || isFavorite}/>
            </button>
            <button onClick={handleCopyLink} className="px-4 py-2 mx-2 mb-2 rounded-lg bg-secondary text-gray-800 border border-secondary hover:bg-white">
              Copy link <span className="ti ti-link"></span>
            </button>
            <button onClick={handleModal} className='px-4 py-2 mx-2 rounded-lg border border-black bg-black text-white hover:bg-white hover:text-black'>
                Share <span className="ti ti-share"></span>
            </button>

            { modalOpen && <button onClick={handleModal} className='fixed top-0 left-0 right-0 bottom-0 bg-black/40'></button>}

            <Modal open={modalOpen} handleModal={handleModal} >
              <h5 className='text-center font-bold text-gray-700 text-2xl'>Share it easily!</h5>
               <div className='flex justify-center items-center h-[100px]'>
                  <button type='button' className='mx-3 w-[50px] h-[50px] text-center text-xl bg-blue-600 text-white rounded-full hover:bg-blue-700'>
                    <span className="ti ti-facebook"></span>
                  </button>
                  <button type='button' className='mx-3 w-[50px] h-[50px] text-center text-xl bg-blue-400 text-white rounded-full hover:bg-blue-500'>
                    <span className="ti ti-twitter"></span>
                  </button>
                  <button type='button' className='mx-3 w-[50px] h-[50px] text-center text-xl bg-pink-400 text-white rounded-full hover:bg-pink-500'>
                    <span className="ti ti-instagram"></span>
                  </button>
                  <button type='button' className='mx-3 w-[50px] h-[50px] text-center text-xl bg-gray-500 text-white rounded-full hover:bg-gray-600'>
                    <span className="ti ti-email"></span>
                  </button>
               </div>
               <button type='button' onClick={handleModal} className="py-2 px-4 rounded-lg bg-gray-600 text-white">
                close
               </button>
            </Modal>
        </div >
    )
}

export default Buttons