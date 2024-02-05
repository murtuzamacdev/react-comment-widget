import React, { useContext, useState } from 'react'
import { kanbanContext } from '../../context/kanban.context'

export default function AddListForm({add}) {
    const [text, setText] = useState("")

    return (
    <div>
        <input className='bg-gray-50 p-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg' value={text} onChange={(e) => setText(e.target.value)}  placeholder='Enter text'/>
        <button onClick={() => {add(text); setText("")}} className="text-white ml-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
    </div>
  )
}
