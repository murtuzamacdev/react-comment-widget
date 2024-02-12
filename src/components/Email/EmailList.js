import { EmailContext } from '../../context/email.context'
import { useContext } from "react";

const EmailList = () => {
    const emailContext = useContext(EmailContext)

    return (<div className='mr-5'>
        
        {
        emailContext.emails.map((item) => {
            if (item.folder.includes(emailContext.selectedFolderId)) {
                return <div onClick={() => { emailContext.setSelectedEmail(item) }} key={item.id}>{item.subject}</div>
            } else {
                return null
            }
        })
        }
    </div>);
}

export default EmailList;