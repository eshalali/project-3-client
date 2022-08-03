import { useState } from 'react'
import { createBook } from '../../api/books'
import { useNavigate } from 'react-router-dom'
import { createBookSuccess, createBookFailure } from '../shared/AutoDismissAlert/messages'
import BookForm from '../shared/BookForm'

const CreateBook = (props) => {
    console.log('these are the props in createBook\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [book, setBook] = useState({
        title: '',
        author: '',
        description: '',
        image: null
    })

    console.log('this is book in createBook', book)

    // const handleChange = (e) => {
    //     setBook(prevBook => {
    //         let updatedValue = e.target.value
    //         const updatedName = e.target.name

    //         console.log('this is the input type', e.target.type)

    //         if (e.target.type === 'number') {
    //             // this is looking at the input type, and changing it from the default, which is a string, into an actual number
    //             updatedValue = parseInt(e.target.value)
    //         }

    //         // this handles the checkbox, changing on to true etc
    //         if (updatedName === "adoptable" && e.target.checked) {
    //             updatedValue = true
    //         } else if (updatedName === "adoptable" && !e.target.checked) {
    //             updatedValue = false
    //         }

    //         const updatedBook = {
    //             [updatedName]: updatedValue
    //         }
    //         return {
    //             ...prevBook,
    //             ...updatedBook
    //         }
    //     })
    // }

    // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createBook(user, book)
            // if we're successful, navigate to the show page for the new book
            .then(res => { navigate(`/books/${res.data.book.id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createBookSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createBookFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <BookForm 
            Book={ book } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new book!"
        />
    )
}

export default CreateBook