const Carousel = () => {
    return (
      <div className='bg-[#FAF0D7] text-[#125C13] flex items-center  rounded-md'>
          <div className='flex-1 px-4 md:px-24'>
              <p className='text-base md:text-3xl font-medium '>Grab Upto 50% Off On<br/>Selected Headphone</p>
              <button className='px-4 py-1 bg-[#125C13] text-white rounded-full mt-3'>Buy Now</button>
          </div>
          <div className='flex-1'>
              <img src='Assets/CarouselImage.png' alt="" className='w-40 h-52 object-cover'/>
          </div>
      </div>
    )
  }
  
  export default Carousel