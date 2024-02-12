import data from '../../data/email.json'
import { useContext } from "react";
import { EmailContext } from '../../context/email.context'

const FolderList = () => {
    const emailContext = useContext(EmailContext)

    const handleFolderClick = (id) => {
        emailContext.setSelectedFolderId(id);
        let topEmail = emailContext.emails.filter((email) => email.folder.includes(id))[0];
        emailContext.setSelectedEmail(topEmail ? { ...topEmail } : null);
    }

    return (<div className='mr-5'>
        {data.folders.map((item) => <div onClick={() => { handleFolderClick(item.id)}} key={item.id}>{item.name}</div>)}
    </div>);
}

export default FolderList;