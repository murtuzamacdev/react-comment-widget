import { useState } from "react";
import AddCommentForm from './AddCommentForm';

const Comments = ({commentsObj, isFirst, postComment, updateComment, toggleLike, deleteComment}) => {
    const [showEditBox, setShowEditBox] = useState(false);
    const [showAddBox, setShowAddBox] = useState(false);
    const [showChild, setShowChild] = useState(isFirst)

    return <>
      {commentsObj.commentId && <div className='mt-4'>
        <p>{commentsObj.commentText}</p>
        <button className='mr-3 text-blue-600' onClick={() => { toggleLike(commentsObj.commentId, true) }} >{commentsObj.commentLikes} likes</button>
        <button className='mr-3 text-blue-600' onClick={() => { toggleLike(commentsObj.commentId, false) }}>Unlike</button>
        <button className='mr-3 text-blue-600' onClick={() => { setShowAddBox(!showAddBox) }}>Reply</button>
        <button className='mr-3 text-blue-600' onClick={() => { setShowEditBox(!showEditBox) }}>Edit</button>
        <button className='mr-3 text-blue-600' onClick={() => { deleteComment(commentsObj.commentId)  }}>Delete</button>
        {commentsObj.comments.length !== 0 && <button className='text-blue-600' onClick={() => { setShowChild(!showChild) }} >{commentsObj.comments.length} Replies</button>}
        
        {showAddBox && <AddCommentForm value={""} postComment={postComment} onCancel={setShowAddBox} commentId={commentsObj.commentId} />}
        { showEditBox &&  <AddCommentForm value={commentsObj.commentText} onCancel={setShowEditBox} postComment={updateComment} commentId={commentsObj.commentId} />}
      </div>}

      <div className='ml-6'>
        {showChild && commentsObj?.comments?.map((obj) => <Comments key={obj.commentId} commentsObj={obj} isFirst={false} postComment={postComment} updateComment={updateComment} deleteComment={deleteComment} toggleLike={toggleLike}/>)}
      </div>
    </>
  }

export default Comments