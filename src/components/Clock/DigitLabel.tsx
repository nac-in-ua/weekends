import React from 'react'

type PropsType = {
  label: string
}

const DigitLabel = ({ label }: PropsType) => {
  console.log('label remdered!')

  return (
    <div className="flex h-8 items-center justify-center text-lg font-thin uppercase">
      {label}
    </div>
  )
}

export default React.memo(DigitLabel)
