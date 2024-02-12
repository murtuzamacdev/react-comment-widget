import { createContext, useReducer, useState } from "react";
import data from '../data/email.json'

// GET emails list from local storage

// Mark email as fav

// Delete an email

// Mark email as read unread

function emailReducer(state, action) {
    if (action.type === "UPDATE") {
        let id = action.payload.id;
        return state.map((email) => {
            return email.id === id ? action.payload : email;
        })
    }
}

export const EmailContext = createContext();

const EmailContextProvider = ({ children }) => {
    const [emails, emailsDispatch] = useReducer(emailReducer, data.emails);
    const [selectedFolderId, setSelectedFolderId] = useState(data.folders[0].id);
    const [selectedEmail, setSelectedEmail] = useState(emails[0])

    return (<EmailContext.Provider value={{
        emails,
        emailsDispatch,
        selectedFolderId,
        setSelectedFolderId,
        selectedEmail,
        setSelectedEmail
    }}>
        {children}
    </EmailContext.Provider>);
}

export default EmailContextProvider; 