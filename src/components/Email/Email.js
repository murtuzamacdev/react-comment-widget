import FolderList from "./FolderList";
import EmailList from "./EmailList";
import EmailDisplay from "./EmailDisplay";

function Email() {
    return (<div className="flex">
        <FolderList />
        <EmailList />
        <EmailDisplay />
    </div>);
}

export default Email;