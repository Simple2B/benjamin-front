'use client';
import React, { useState } from 'react'
import IconSearch from './icons/iconSearch'
import IconCamera from './icons/iconCamera'
import IconSettings from './icons/iconSettings'


const SearchBar = () => {
	const [userInput, setUserInput] = useState<string>()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
		setUserInput(e.target.value)
	}

	return (
		<div className='inline-flex items-center gap-2 rounded-lg bg-white h-12 justify-evenly px-1.5 w-80'>
			<IconSearch />
			<input type='text' placeholder='Seach for the soldier' onChange={handleChange} value={userInput} />
			<IconCamera />			
			<div className='inline-flex items-center justify-center h-9 w-9 bg-turquoise-100 rounded'>
				<IconSettings />
			</div>
		</div>
	)
}

export default SearchBar
