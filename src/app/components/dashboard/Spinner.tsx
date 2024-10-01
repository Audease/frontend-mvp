import { Spinner } from 'flowbite-react'


const LoadingSpinner = () => {
  return (
    <div className='relative inset-0 flex items-center justify-center bg-white bg-opacity-75'>
      <Spinner aria-label="Loading..." size="xl" color="warning" />
    </div>
  )
}

export default LoadingSpinner
