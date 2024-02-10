import React, { useContext, useState } from "react";
import EditCard from "./EditCard";
import { kanbanContext as kc } from "../../context/kanban.context";

export default function Card({ cardItem, handleDelete, handleEdit }) {
    const kanbanContext = useContext(kc);
    const [editMode, setEditMode] = useState(false);

    const _handleEdit = (text) => {
        setEditMode(false);
        handleEdit(cardItem.id, text);
    };

    const handleDragStart = (e, _cardItem) => {
        e.stopPropagation();
        kanbanContext.setDragger({ ...kanbanContext.dragger, dragged: _cardItem });
    };

    const handleDragEnd = (e) => {
        e.stopPropagation();
        e.target.classList.remove("dragging");

        let list = kanbanContext.list;

        let listIndex1 = list.findIndex(
            (item) => item.id === kanbanContext.dragger.dragged.listId
        );
        let cardIndex1 = list[listIndex1].cards.findIndex(
            (item) => item.id === kanbanContext.dragger.dragged.id
        );

        if (!kanbanContext.dragger.draggedEnter.listId && kanbanContext.dragger.draggedEnter.id) {
            let listIndex2 = list.findIndex(
                (item) => item.id === kanbanContext.dragger.draggedEnter.id
            );

            list[listIndex1].cards.splice(cardIndex1, 1);
            list[listIndex2].cards.push({
                id: kanbanContext.dragger.dragged.id,
                text: kanbanContext.dragger.dragged.text
            })
        }else{
            let listIndex2 = list.findIndex(
                (item) => item.id === kanbanContext.dragger.draggedEnter.listId
            );
            let cardIndex2 = list[listIndex2].cards.findIndex(
                (item) => item.id === kanbanContext.dragger.draggedEnter.id
            );
    
            list[listIndex1].cards.splice(cardIndex1, 1);
            list[listIndex2].cards.splice(cardIndex2, 0, {
                id: kanbanContext.dragger.dragged.id,
                text: kanbanContext.dragger.dragged.text
            });
        }


        kanbanContext.setList([...list]);
        kanbanContext.setDragger({ dragged: null, draggedEnter: null });
    };

    const handleDragEnter = (e, _cardItem) => {
        e.stopPropagation();
        kanbanContext.setDragger({
            ...kanbanContext.dragger,
            draggedEnter: _cardItem,
        });
    };

    return (
        <div
            draggable={true}
            onDragStart={(e) => { handleDragStart(e, cardItem); }}
            onDragEnter={(e) => { handleDragEnter(e, cardItem); }}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className="draggable cursor-move flex content-evenly justify-between mb-3 mt-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            {!editMode ? (
                <>
                    <p className="text-lg pointer-events-none">{cardItem.text}</p>
                    <div className="">
                        <button onClick={() => { setEditMode(true); }} className="mr-3"> Edit </button>
                        <button onClick={() => { handleDelete(cardItem.id); }}> Delete </button>
                    </div>
                </>
            ) : (
                <>
                    <EditCard
                        initTextValue={cardItem.text}
                        handleEdit={_handleEdit}
                        setEditMode={setEditMode}
                    />
                </>
            )}
        </div>
    );
}
