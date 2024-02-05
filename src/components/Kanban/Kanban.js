import { useContext, useState } from "react";
import AddListForm from "./AddListForm";
import List from "./List";
import { createList } from '../../model/kanban'
import KanbanContextProvider, {kanbanContext as kc} from "../../context/kanban.context";

const Kanban = () => {
    const kanbanContext = useContext(kc)

    const addNewList = (listName) => {
        let newListIem = createList(listName);
        kanbanContext.setList([...kanbanContext.list, newListIem])
    }

    return <>
        <AddListForm add={addNewList} />
        <div className="flex overflow-x-auto">
        {kanbanContext.list.map((listItem) => <List key={listItem.id} listItem={listItem} />)}
        </div>
        
    </>
}

export default Kanban;