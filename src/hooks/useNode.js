export const useNode = () => {

    const addComment = (_data, commentId, text, cb) => {
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

        cb(_data)
    }

    const editComment = (_data, commentId, text, cb) => {
        findNode(commentId, _data, function(commentNode){
          commentNode.commentText = text;
        })

        cb(_data)
    }

    const deleteComment = (_data, commentId, cb) => {
        function findAndDelete(commentNode) {
            if (commentNode.comments.findIndex((item) => item.commentId === commentId) !== -1) {
              commentNode.comments = commentNode.comments.filter((item) => item.commentId !== commentId);
              return true;
            }
            else {
              for (let item of commentNode.comments) {
                let result = findAndDelete(item);
                if (result) { return true; }
              }
            }
          }
      
          findAndDelete(_data);

          cb(_data)
    }

    const likeComment = (_data, commentId, isLike, cb) => {
        if (commentId === null) {
            _data.likes = isLike ? _data.likes + 1 : _data.likes - 1;
          } else {
            findNode(commentId, _data, function (commentNode) {
              commentNode.commentLikes = isLike ? commentNode.commentLikes + 1 : commentNode.commentLikes - 1;
            })
          }

          cb(_data)
    }

    const findNode = (commentId, _data, cb) => {
        function getCommentNode(commentNode) {
          if (commentNode.commentId === commentId) {
            cb(commentNode)
            return true;
          } else {
            for (let item of commentNode.comments) {
              let result = getCommentNode(item);
              if (result) {
                return true;
              }
            }
            return false
          }
        }
    
        getCommentNode(_data)
      }

    return {addComment, editComment, deleteComment, likeComment}

}