import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CommentForm from '../shared/CommentForm'
import { createComment } from '../../api/comments'

const NewCommentModal = (props) => {
    const { user, book, show, handleClose, msgAlert, triggerRefresh } = props

    const [comment, setComment] = useState({})

    const handleChange = (e) => {
        setComment(prevComment => {
            let value = e.target.value
            const name = e.target.name
            const updatedComment = {
                [name]: value
            }
            return {
                ...prevComment,
                ...updatedComment
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createComment(user, book.id, comment)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Added!',
                    message: 'Comment created!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, try again',
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CommentForm 
                    comment={comment}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Write a comment"
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewCommentModal