

import React, { Suspense } from 'react'

const AvailabilityLayout = ({children}) => {
  return (
    <div>
      <Suspense fallback={<div>Loading events..</div>}>{children}</Suspense>
    </div>
  )
}

export default AvailabilityLayout
