import React, { useState } from 'react'

export default function EditCard({ setEditMode, handleEdit, initTextValue }) {
    const [text, setText] = useState(initTextValue)

    return (
        <>
            <input className='bg-gray-50 p-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg' value={text} onChange={(e) => setText(e.target.value)}  placeholder='Enter text'/>
            <button onClick={() => {handleEdit(text)}} className='mr-3'>Save</button>
            <button onClick={() => { setEditMode(false) }} >Cancel</button>
        </>
    )
}
