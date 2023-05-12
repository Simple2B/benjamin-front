import React from 'react'
import IconSearch from './icons/iconSearch'
import IconCamera from './icons/iconCamera'
import IconSettings from './icons/iconSettings'

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <div className='inline-flex items-center gap-2 rounded-lg bg-white h-12 justify-evenly px-1.5 w-[350px]'>
        <IconSearch />
        <input type='text' placeholder='Seach for the soldier' />
        <IconCamera />
        <div className='inline-flex items-center justify-center h-9 w-9 bg-turquoise-100 rounded'>
            <IconSettings />
        </div>
    </div>
  )
}

export default SearchBar