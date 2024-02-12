import { EmailContext } from '../../context/email.context'
import { useContext } from "react";

const EmailDisplay = () => {
    const emailContext = useContext(EmailContext);

    const handleUpdate = (param) => {
        let updatedSelectedEmail = { ...emailContext.selectedEmail, ...param }

        emailContext.setSelectedEmail(updatedSelectedEmail);

        emailContext.emailsDispatch({
            type: 'UPDATE',
            payload: updatedSelectedEmail
        })
    }

    const handleFav = () => {
        let favIndex = emailContext.selectedEmail.folder.indexOf(3);
        if (favIndex === -1) {
            emailContext.selectedEmail.folder.push(3)
        } else {
            emailContext.selectedEmail.folder.splice(favIndex, 1)
        }

        emailContext.setSelectedEmail({ ...emailContext.selectedEmail })
        emailContext.emailsDispatch({
            type: 'UPDATE',
            payload: { ...emailContext.selectedEmail }
        })
    }

    const handleDelete = () => {
        let updatedSelectedEmail = { ...emailContext.selectedEmail }
        updatedSelectedEmail.folder.push(4);
        updatedSelectedEmail.folder.splice(updatedSelectedEmail.folder.indexOf(emailContext.selectedFolderId), 1)
        let topEmail = emailContext.emails.filter((email) => email.folder.includes(emailContext.selectedFolderId))[0];
        emailContext.setSelectedEmail(topEmail ? { ...topEmail } : null);
        // emailContext.setSelectedEmail({ ...emailContext.selectedEmail })
        emailContext.emailsDispatch({
            type: 'UPDATE',
            payload: updatedSelectedEmail
        })
    }

    return (<div>
        {emailContext.selectedEmail && <div className={emailContext.selectedEmail.read === false ? 'font-bold' : ''}>
            <p>{emailContext.selectedEmail.folder.includes(3) && '<<Favourited>>'}</p>
            <p>{emailContext.selectedEmail.from}</p>
            <p>{emailContext.selectedEmail.to}</p>
            <p>{emailContext.selectedEmail.subject}</p>
            <p>{emailContext.selectedEmail.body}</p>
            <button onClick={handleFav} className='mr-2'>Mark as {emailContext.selectedEmail.folder.includes(3) ? 'Unfav' : 'Fav'}</button>
            <button onClick={() => handleUpdate({ read: !emailContext.selectedEmail.read })} className='mr-2'>Mark as {emailContext.selectedEmail.read ? 'Unread' : 'read'}</button>
            {!emailContext.selectedEmail.folder.includes(4) && <button onClick={handleDelete} className='mr-2'>Delete</button>}
        </div>}
    </div>);
}

export default EmailDisplay;