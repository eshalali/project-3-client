import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditCommentModal from './EditCommentModal'
// import { deleteComment } from '../../api/comments'

const ShowComment = (props) => {
    // destructure some props
    const { comment, book, user, triggerRefresh, msgAlert } = props
    // here's where we'll put a hook to open the edit toy modal when we get there
    const [editModalShow, setEditModalShow] = useState(false)

    const removeComment = () => {
        for (let i = 0; i < book.data.comments; i++) {
            if (book.data.comments[i] === comment) {
                book.data.comments.splice(i,1)
                msgAlert({
                    heading:'Deleted',
                    message: 'Comment has been deleted',
                    variant: 'success'
                })
                triggerRefresh()
            } else {
            msgAlert({
                heading:'Unsuccessful',
                message: 'Couldnt delete comment',
                variant: 'danger'
            })
        }
    }
    }
    return (
        <>
            <Card className='m-2' style='width: 18rem'>
                <Card.Header>{comment.owner}</Card.Header>
                <Card.Body>
                    <p>{comment.note}</p>
                </Card.Body>
                <Card.Footer>
                    {
                        user && user._id === comment.owner._id 
                        ?
                        <>
                            <Button variant='warning' onClick={() => setEditModalShow(true)}>Edit Comment</Button>
                            <Button variant='danger' onClick={() => removeComment()}>Delete Commment</Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditCommentModal 
                user={user}
                book={book}
                comment={comment}
                show={editModalShow}
                handleClose= {() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )



}

export default ShowComment