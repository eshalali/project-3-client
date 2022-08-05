import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import BookForm from '../shared/BookForm'
import { updateBookSuccess, updateBookFailure } from '../shared/AutoDismissAlert/messages'

const EditBookModal = (props) => {
    const { 
        user, show, handleClose, 
        updateBook, msgAlert, triggerRefresh
    } = props

    const [book, setBook] = useState(props.book)

    console.log('book in edit modal', book)

    const handleChange = (e) => {
        setBook(prevBook => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "adoptable" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "adoptable" && !e.target.checked) {
                updatedValue = false
            }

            const updatedBook = {
                [updatedName]: updatedValue
            }
            return {
                ...prevBook,
                ...updatedBook
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateBook(user, book)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateBookSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateBookFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <BookForm 
                    book={book}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Book"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditBookModal