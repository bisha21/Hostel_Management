import React from 'react'

const Spinner = () => {
  return (
    <div className=" ml-[40%] py-6">
  <div className="relative">
    <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200" />
    <div className="w-12 h-12 rounded-full animate-spin absolute  border-8 border-solid border-green-500 border-t-transparent">
    </div>
  </div>
</div>

  )
}

export default Spinner