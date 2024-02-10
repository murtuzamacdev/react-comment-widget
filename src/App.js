import { useState } from 'react';
import './App.css';
import commentData from './data/data.json';
import AddCommentForm from './components/AddCommentForm';
import { useNode } from './hooks/useNode.js';
import Comments from './components/Comments';
import Kanban from './components/Kanban/Kanban';
import KanbanContextProvider from './context/kanban.context';
import {FoodAppProvider} from './context/foodapp.context.js'
import FoodApp from "./components/FoodApp/FoodApp.js";

function App() {
  const [data, setData] = useState(commentData)
  const { addComment, editComment, deleteComment, likeComment } = useNode();

  function postComment(commentId, text) {
    addComment(data, commentId, text, (updateData) => {
      setData({ ...updateData });
    })
  }

  function updateComment(commentId, text) {
    editComment(data, commentId, text, (updateData) => {
      setData({ ...updateData });
    })
  }

  function toggleLike(commentId, isLike){
    likeComment(data, commentId, isLike, (updateData) => {
      setData({ ...updateData });
    })
  }

  function handleDelete(commentId){
    deleteComment(data, commentId, (updateData) => { setData({ ...updateData }); })
  }
  
  return (
    <div className="App">
      <FoodAppProvider>
        <FoodApp />
      </FoodAppProvider>
      

      {/* <KanbanContextProvider>
      <Kanban/>
      </KanbanContextProvider> */}
      
      {/* <AddCommentForm value={""} postComment={postComment} commentId={null} onCancel={() => {}}/> */}
      {/* <h4 className="font-bold mt-7 mb-1">Comments</h4> */}
      {/* <Comments commentsObj={data} isFirst={true} postComment={postComment} updateComment={updateComment} deleteComment={handleDelete} toggleLike={toggleLike}/> */}
    </div>
  );
}

export default App;
