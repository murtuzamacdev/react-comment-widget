import { createContext, useState } from "react";

export const kanbanContext = createContext()

const KanbanContextProvider = ({children}) => {
    const [list, setList] = useState([])
    const [dragger, setDragger] = useState({dragged: null, draggedEnter: null})


    return <>
        <kanbanContext.Provider value = {{
            list,
            setList,
            dragger,
            setDragger
        }}>
            {children}
        </kanbanContext.Provider>
    </>
}

export default KanbanContextProvider