import { useState } from "react"

const AddCommentForm = ({value, commentId, postComment}) => {
    const [text, setText] = useState(value);

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleCancel = () => {
        setText(value)
        document.getElementById(commentId ? `${commentId}${value === "" ? '_box' : '_editBox'}` : 'post_box').style.display = 'none';
    }

    return <div className="bg-slate-200 p-5">
        <input onChange={handleChange} placeholder="Add comment" value={text} />
        <button onClick={() => {postComment(commentId, text); setText(value === "" ? "" : text)}} className='ml-3 mr-3 text-blue-600'>Post</button>
        <button className='mr-3 text-blue-600' onClick={handleCancel}>Cancel</button>
    </div>
}

export default AddCommentForm