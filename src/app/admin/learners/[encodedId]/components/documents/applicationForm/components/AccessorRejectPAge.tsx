import React from 'react'

type Props = {}

const AccessorRejectPage = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full my-20">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
        <strong className="font-bold">Welldone!</strong>
        <span className="block sm:inline"> You have successfully rejected the learner&apos;s application form.</span>
      </div>
      <p>The form is reopened and an email has been succesfuly sent to the learner to refill the form</p>
    </div>
  )
}

export default AccessorRejectPage 