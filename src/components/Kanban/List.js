import React, { useContext } from 'react'
import { kanbanContext as kc } from '../../context/kanban.context'
import { createCard } from '../../model/kanban'
import AddListForm from './AddListForm'
import Card from './Card'

export default function List({ listItem }) {
    const kanbanContext = useContext(kc);

    const addNewCard = (cardName) => {
        let newCard = createCard(cardName);
        let list = kanbanContext.list;
        list[list.findIndex((item) => item.id === listItem.id)].cards.push(newCard);
        kanbanContext.setList([...list]);
    }

    const handleDelete = (id) => {
        let list = kanbanContext.list;
        let listIndex = list.findIndex((item) => item.id === listItem.id);
        list[listIndex].cards = list[listIndex].cards.filter((item) => item.id !== id)
        kanbanContext.setList([...list]);
    }

    const handleEdit = (id, text) => {
        let list = kanbanContext.list;
        let listIndex = list.findIndex((item) => item.id === listItem.id);
        let cardIndex = list[listIndex].cards.findIndex((item) => item.id === id);
        list[listIndex].cards[cardIndex].text = text;
        kanbanContext.setList([...list]);
    }

    return (
        <div className='border-2 rounded-lg p-3 mr-3 w-[400px] min-w-[400px]'>
            <p className='text-xl font-semibold mb-3'>{listItem.title}</p>
            <div id={listItem.id} className="pt-3 pb-3">
                {listItem.cards.map((cardItem) => <Card key={cardItem.id} handleDelete={handleDelete} handleEdit={handleEdit} cardItem={{...cardItem, listId: listItem.id}} />)}
            </div>

            <AddListForm add={addNewCard} />
        </div>
    )
}
