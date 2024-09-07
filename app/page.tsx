import Image from 'next/image';

export default function Home() {
  return (
    <main className="">
      <section id='hero' className="hero relative">
        {/* <div className="search-wrap absolute z-10 left-[10%] right-[10%] top-[50%] md:left-[30%] md:right-unset md:w-[400px] rounded-md">
          <form className='flex gap-2 shadow'>
            <input type="search" placeholder='Pizza i.e.' className='w-10/12 p-1 px-3 md:w-11/12 rounded-md focus:outline-none' />
            <button type='submit' className='p-1 w-3/12 rounded-md text-center center bg-primary text-white'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </form>
        </div>
        <div className="search-wrap-layer"></div> */}
      </section>
      <section id='pro' className='p-6'>
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
              <a href="#">
              <h4 className='text-primary text-3xl'>Trends</h4>
               <div className="relative w-[150px] h-[150px]">
                <Image className='rounded-lg' src='/images/trends.webp' fill alt='trends'/>
               </div>
              </a>
            </div>
            <div className="">
              <a href="#">
              <h4 className='text-primary text-3xl'>Quick</h4>
               <div className="relative w-[150px] h-[150px]">
                <Image className='rounded-lg' src='/images/quick.jpeg' fill alt='quick'/>
               </div>
              </a>
            </div>
            <div className="">
              <a href="#">
              <h4 className='text-primary text-3xl'>Healthy</h4>
               <div className="relative w-[150px] h-[150px]">
                <Image className='rounded-lg' src='/images/healthy.jpg' fill alt='healthy'/>
               </div>
              </a>
            </div>
            <div className="">
              <a href="#">
              <h4 className='text-primary text-3xl'>Vegan</h4>
               <div className="relative w-[150px] h-[150px]">
                <Image className='rounded-lg' src='/images/vegan.jpg' fill alt='vegan'/>
               </div>
              </a>
            </div>
            <div className="">
              <a href="#">
              <h4 className='text-primary text-3xl'>Delicious</h4>
               <div className="relative w-[150px] h-[150px]">
                <Image className='rounded-lg' src='/images/delicious.jpg' fill alt='delicious'/>
               </div>
              </a>
            </div>
            <div className="">
              <a href="#">
              <h4 className='text-primary text-3xl'>Lunch Box</h4>
               <div className="relative w-[150px] h-[150px]">
                <Image className='rounded-lg' src='/images/lunch-box.jpeg' fill alt='lunch box'/>
               </div>
              </a>
            </div>
          </div>
          {/* food news */}
          <div className="news md:w-6/12 lg:w-4/12">
            <div className="w-100 py-4 px-6 bg-gray-200">
              <h3 className='text-2xl font-bold text-center'>Food News</h3>
              <ul className='mt-3'>
                <li className='mb-6'>
                  <div className='flex gap-5'>
                    <Image className='block' src='/images/news-1.webp' width={100} height={80} alt='news'/>
                    <div>
                      <h5 className='text-xl font-bold hover:underline'>
                        <a href="#">Aldi’s Holiday Beer and Wine Selection Has Landed..</a>
                      </h5>
                      <p className='text-gray-600'>12 mart 2024</p>
                    </div>
                  </div>
                </li>
                <li className='mb-6'>
                  <div className='flex gap-5'>
                    <Image className='block' src='/images/news-1.webp' width={100} height={80} alt='news'/>
                    <div>
                      <h5 className='text-xl font-bold hover:underline'>
                        <a href="#">Aldi’s Holiday Beer and Wine Selection Has Landed..</a>
                      </h5>
                      <p className='text-gray-600'>12 mart 2024</p>
                    </div>
                  </div>
                </li>
                <li className='mb-6'>
                  <div className='flex gap-5'>
                    <Image className='block' src='/images/news-1.webp' width={100} height={80} alt='news'/>
                    <div>
                      <h5 className='text-xl font-bold hover:underline'>
                        <a href="#">Aldi’s Holiday Beer and Wine Selection Has Landed..</a>
                      </h5>
                      <p className='text-gray-600'>12 mart 2024</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
