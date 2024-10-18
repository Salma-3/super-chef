import Image from 'next/image';
import Link from 'next/link';
import FoodNews from './ui/FoodNews';
import { Suspense } from 'react';
import Spinner from './ui/Spinner';

export default function Home() {

  return (
    <main className="">
      <section id='hero' className="hero relative">
        
      </section>
      <section id='pro' className='p-6 py-20'>
        <div className='flex w-100 gap-4 md:px-12'>
          <h2 className='text-primary text-3xl font-bold'>Explore</h2>
          <div className='grow'>
            <form className='flex gap-2'>
              <input type="search" placeholder='Pizza i.e.' className='w-10/12 p-1 px-3 md:w-11/12 rounded-xl border border-gray-400 shadow-lg focus:outline-none' />
              <button type='submit' className='p-1 w-3/12 rounded-xl bg-primary text-white'>
                search  
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col justify-around items-center mt-10 xl:justify-center xl:gap-20 md:flex-row">
          {/* food types: trends, healthy, quick, vegan, lunch box */}
          <div className="grid grid-cols-2 gap-5 md:w-7/12 lg:w-6/12 lg:grid-cols-3 xl:w-5/12 mb-6">
            <div className="">
              <Link href="/recipes?tags=trendy">
              <h4 className='text-primary text-3xl'>Trends</h4>
               <div className="relative w-[150px] h-[150px]">
                <Image className='rounded-lg' src='/images/trends.webp' sizes='150px'  fill alt='trends'/>
               </div>
              </Link>
            </div>
            <div className="">
              <Link href="/recipes?tags=quick">
              <h4 className='text-primary text-3xl'>Quick</h4>
               <div className="relative w-[150px] h-[150px]">
                <Image className='rounded-lg' src='/images/quick.jpeg' sizes='150px' fill alt='quick'/>
               </div>
              </Link>
            </div>
            <div className="">
              <Link href="/recipes?tags=healthy">
              <h4 className='text-primary text-3xl'>Healthy</h4>
               <div className="relative w-[150px] h-[150px]">
                <Image className='rounded-lg' src='/images/healthy.jpg' sizes='150px' fill alt='healthy'/>
               </div>
              </Link>
            </div>
            <div className="">
              <Link href="/recipes?tags=vegan">
              <h4 className='text-primary text-3xl'>Vegan</h4>
               <div className="relative w-[150px] h-[150px]">
                <Image className='rounded-lg' src='/images/vegan.jpg' sizes='150px' fill alt='vegan'/>
               </div>
              </Link>
            </div>
            <div className="">
              <Link href="/recipes?tags=delicious">
              <h4 className='text-primary text-3xl'>Delicious</h4>
               <div className="relative w-[150px] h-[150px]">
                <Image className='rounded-lg' src='/images/delicious.jpg' sizes='150px' fill alt='delicious'/>
               </div>
              </Link>
            </div>
            <div className="">
              <Link href="/recipes?tags=lunch">
              <h4 className='text-primary text-3xl'>Lunch Box</h4>
               <div className="relative w-[150px] h-[150px]">
                <Image className='rounded-lg' src='/images/lunch-box.jpeg' sizes='150px' fill alt='lunch box'/>
               </div>
              </Link>
            </div>
          </div>
          {/* food news */}
          <Suspense fallback={<Spinner />}>
            <FoodNews />
          </Suspense>
        </div>
      </section>

      {/* join the club */}
      <section className='bg-primary text-center py-14'>
        <Link href='/auth/signup' className='p-2 px-8 text-xl font-bold bg-white text-primary hover:underline'>Join the club</Link>
      </section>

      {/* meals */}
      <section>
        <div className='py-20'>
          <div className="flex items-center text-center justify-center mb-4 gap-10">
            <Link href='/recipes?categories=2'>
              <Image className='rounded-full shadow-lg mb-2 md:hidden' src='/images/breakfast.jpeg' width={80} height={80} alt='breakfast'/>
              <Image className='hidden rounded-full shadow-lg mb-2 md:block' src="/images/breakfast.jpeg" alt="breakfast" width={120} height={120} />
              <h6 className='text-gray-800'>Breakfast</h6>
            </Link>
            <Link href='/recipes?categories=3'>
              <Image className=' hidden rounded-full shadow-lg mb-2 md:block' src="/images/lunch.jpg" alt="lunch" width={120} height={120} />
              <Image className='rounded-full shadow-lg mb-2 md:hidden' src="/images/lunch.jpg" alt="lunch" width={80} height={80} />
              <h6 className='text-gray-800'>Lunch</h6>
            </Link>
            <Link href='/recipes?categories=1'>
              <Image className='hidden rounded-full shadow-lg mb-2 md:block' src="/images/quick.jpg" alt="dinner" width={120} height={120} />
              <Image className='rounded-full shadow-lg mb-2 md:hidden' src="/images/quick.jpg" alt="dinner" width={80} height={80} />
              <h6 className='text-gray-800'>Dinner</h6>
            </Link>
          </div>
          <div className="flex items-center text-center justify-center gap-10">
            <Link href='/recipes?categories=6'>
              <Image className='hidden rounded-full shadow-lg mb-2 md:block' src="/images/appetizer.jpg" alt="appetizer" width={120} height={120} />
              <Image className='rounded-full shadow-lg mb-2 md:hidden' src="/images/appetizer.jpg" alt="appetizer" width={80} height={80} />
              <h6 className='text-gray-800'>Appetizers</h6>
            </Link>
            <Link href='/recipes?categories=5'>
              <Image className='hidden rounded-full shadow-lg mb-2 md:block' src="/images/desserts.jpeg" alt="desserts" width={120} height={120} />
              <Image className='rounded-full shadow-lg mb-2 md:hidden' src="/images/desserts.jpeg" alt="desserts" width={80} height={80} />
              <h6 className='text-gray-800'>Desserts</h6>
            </Link>
            <Link href='/recipes?categories=4'>
              <Image className='hidden rounded-full shadow-lg mb-2 md:block' src="/images/snacks.jpg" alt="snacks" width={120} height={120} />
              <Image className='rounded-full shadow-lg mb-2 md:hidden' src="/images/snacks.jpg" alt="snacks" width={80} height={80} />
              <h6 className='text-gray-800'>Snacks</h6>
            </Link>
          </div>
        </div>
      </section>

      {/* subscription form */}
      <section className="bg-gray-200 py-20">
        <div className='w-[90%] mx-auto p-6 text-center md:w-[70%] bg-white shadow-xl'>
          <form className=''>
            <h4 className='text-2xl text-primary font-bold'>Subscribe to get continous updates!</h4>
            <div className='flex flex-col md:flex-row gap-3 mt-5 justify-around'>
              <input type="email" name="email" id="email" placeholder='Email' className='w-100 md:w-3/4 border border-gray-300 rounded-xl py-2 px-4 outline-primary/50 ring-primary focus:ring-3 focus:ring-primary' />
              <button className='w-100 bg-primary text-white py-2 px-4 rounded-xl md:w-1/4 hover:bg-primary/70' type='submit'>Subscribe</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
