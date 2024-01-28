import { useState } from 'react';
import './App.css';
import commentData from './data.json';
import AddCommentForm from './components/AddCommentForm';

function App() {
  const [data, setData] = useState(commentData)

  const postComment = (commentId, text) => {
    let _data = data;
    let newCommentId = new Date().getTime()

    if (commentId === null) {
      _data.comments.unshift({
        "commentId": newCommentId,
        "commentText": text,
        "commentLikes": 0,
        "comments": []
      })

    } else {
      findNode(commentId, _data, function(commentNode){
        commentNode.comments.unshift({
          "commentId": newCommentId,
          "commentText": text,
          "commentLikes": 0,
          "comments": []
        })
      })
    }

    document.getElementById(commentId ? `${commentId}_box` : 'post_box').style.display = 'none';
    setTimeout(() => { document.getElementsByClassName(`${commentId}_section`)[0].style.display = 'block' }, 0)
    setData({ ..._data });
  }

  const editComment = (commentId, text) => {
    let _data = data;
    findNode(commentId, _data, function(commentNode){
      commentNode.commentText = text;
    })

    document.getElementById(`${commentId}_editBox`).style.display = 'none';

    setData({ ..._data });
  }

  const deleteComment = (commentId) => {
    console.log('commentId', commentId)
     let _data = data;

    function findAndDelete(commentNode){
       if(commentNode.comments.findIndex((item) => item.commentId === commentId) !== -1){
        commentNode.comments = commentNode.comments.filter((item) => item.commentId !== commentId);
          return true; 
       }
       else{
        for(let item of commentNode.comments){
          let result = findAndDelete(item);
          if(result){ return true; }
        }
       }       
    }

    findAndDelete(_data)

    setData({ ..._data });
  }

  const toggleLike = (commentId, isLike) => {
    let _data = data;

    if (commentId === null) {
      _data.likes = isLike ? _data.likes + 1: _data.likes - 1;
    }else{
      findNode(commentId, _data, function(commentNode){
        commentNode.commentLikes = isLike ? commentNode.commentLikes + 1 : commentNode.commentLikes - 1;
      })      
    }

    setData({ ..._data });
  }

  const findNode = (commentId, _data, cb) => {
    function getCommentNode(commentNode) {
      if (commentNode.commentId === commentId) {
        cb(commentNode)
        return true;
      } else {
        for (let item of commentNode.comments) {
          let result = getCommentNode(item);
          if(result){
           return true;
          }
       }
       return false
      }
    }

    getCommentNode(_data)
  }

  const showAddBox = (eleId) => {
    let current = document.getElementById(eleId).style.display
    document.getElementById(eleId).style.display = (current === "block" ? "none" : 'block')
  }

  const showComments = (eleId) => {
    let elements = document.getElementsByClassName(eleId);

    for(let item of elements){
      item.style.display = "block"
    }
  }

  const getComments = (commentsObj, first) => {
    return <>
      {commentsObj.commentId && <div className='mt-4'>
        <p>{commentsObj.commentText}</p>
        <button className='mr-3 text-blue-600' onClick={() => {toggleLike(commentsObj.commentId, true)}} >{commentsObj.commentLikes} likes</button>
        <button className='mr-3 text-blue-600' onClick={() => {toggleLike(commentsObj.commentId, false)}}>Unlike</button>
        <button className='mr-3 text-blue-600' onClick={() => { showAddBox(commentsObj.commentId + "_box") }}>Reply</button>
        <button className='mr-3 text-blue-600' onClick={() => { showAddBox(commentsObj.commentId + "_editBox") }}>Edit</button>
        <button className='mr-3 text-blue-600' onClick={() => { deleteComment(commentsObj.commentId) }}>Delete</button>
        {commentsObj.comments.length !==0 && <button className='text-blue-600' onClick={() => { showComments(`${commentsObj.commentId}_section`) }} >{commentsObj.comments.length} Replies</button>}
        <div style={{ display: 'none' }} id={commentsObj.commentId + "_box"}><AddCommentForm value={""} postComment={postComment} commentId={commentsObj.commentId} /></div>
        <div style={{ display: 'none' }} id={commentsObj.commentId + "_editBox"}><AddCommentForm value={commentsObj.commentText} postComment={editComment} commentId={commentsObj.commentId} /></div>
      </div>}

      <div>
        {commentsObj.comments.length !== 0 && commentsObj.comments.map((obj) => <div style={{ display: first ? 'block' : 'none' }} key={obj.commentId} className={commentsObj.commentId + "_section ml-7"}>{getComments(obj, false)}</div>)}
      </div>
    </>
  }

  return (
    <div className="App">
      <h1 className="font-bold">{data.postTitle}</h1>
      <div className="flex">
        <button className='mr-3 text-blue-600' onClick={() => {toggleLike(null, true)}}>{data.likes} likes</button>
        <button className='mr-3 text-blue-600' onClick={() => {toggleLike(null, false)}}>Unlike</button>
        <button className='text-blue-600' onClick={() => { showAddBox("post_box") }}>Add comment</button>
      </div>
      <div style={{ display: 'none' }} id={"post_box"}><AddCommentForm postComment={postComment} commentId={null} /></div>

      <h4 className="font-bold mt-7 mb-1">Comments</h4>
      <div>
        {getComments(data, true)}
      </div>
    </div>
  );
}

export default App;
