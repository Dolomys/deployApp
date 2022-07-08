import axios from 'axios'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import FormInput from '../FormInput/FormInput'
import ReactTimeAgo from 'react-time-ago'
import './comments.scss'

const Comments = ({update, setUpdate, id, spot}) => {

    const {user} = useContext(Context)
    const [commentContent, setCommentContent] = useState()

    const comment = {
        id:"1",
        type:"text",
        placeholder:"My comment !",
        label:"Input your comment",
      }


    const submitComment = async(e) => {
        e.preventDefault()
        try {
    
          const data =  {
            comments: {
              username: user.username,
              userPhoto: user.profilPic,
              content: commentContent,
              dateOfPublish: Date.now(),
            }
           }
          const res = await axios.put(process.env.REACT_APP_PROXY + `/api/posts/comment/${id}`, data)
          res && setCommentContent("") 
          res && setUpdate(!update)
        }
        catch(err) {
          console.log(err)
        }
      }

  return (
    <div className="comments">
    {user ? (
      <>
      <form action="POST" className="commentInput" onSubmit={submitComment}>
       <FormInput {...comment} onChange={e=> {setCommentContent(e.target.value)}} value={commentContent}/>
       <button type='submit' className='submitBtn'>Submit</button>
      </form>
      </>
      ):
      <h2>Sign in to add comments !</h2>
      }
      <div className="commentList">
          {spot.comments && spot.comments.slice(0).reverse().map(e => (
            <div className='comment' key={e._id}>
              <div className='commentAvatar'>
                  <img src={e.userPhoto} />
              </div>
              <div className="commentBody">
                <div  className='commentInfo'> 
                  <span><strong>{e.username}</strong> • posted <ReactTimeAgo date={e.dateOfPublish} locale="en-US"/></span>
                  {/* {user?.username === e.username && (
                    <div className='modifyDeleteComment'>
                    <span onClick={modifyComment} className="modifyComment">Modify</span>
                    <span onClick={deleteComment} className="deleteComment" data-remove={e._id}>Delete</span>
                    </div>
                  )} */}
                </div>
                <div className='commentContent'>
                {/* {(modifyComm && user?.username === e.username) ? 
                   <form action="POST" className="commentInput" onSubmit={confirmChangeComment}>
                   <FormInput {...modifyCommentModel} onChange={e=> {setCommentModified(e.target.value)}} placeholder={e.content}/>
                   <button type='submit'>Submit</button>
                  </form>
                  :
                  <span>{e.content}</span>
                } */}
                <span>{e.content}</span>
                </div>

              </div>
              
             
            </div>
          ))}
      </div>
    </div>
  )
}

export default Comments