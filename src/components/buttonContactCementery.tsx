import React from 'react'
import IconCall from './icons/iconCall'

type Props = {}

const ButtonContactCementery = (props: Props) => {
  return (
    <div className='inline-flex items-center gap-x-1 p-1.5 rounded-lg bg-turquoise-50'> 
        <IconCall />
        <p className='text-sm'>Call</p>
    </div>
  )
}

export default ButtonContactCementery