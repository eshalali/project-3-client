import { useState } from 'react'
import { createBook } from '../../api/books'
import { useNavigate } from 'react-router-dom'
// import { createBookSuccess, createBookFailure } from '../shared/AutoDismissAlert/messages'
import BookForm from '../shared/BookForm'

const CreateBook = (props) => {
    console.log('these are the props in CreateBook\n', props)
    const {user, msgAlert } = props
    const [book, setBook] = useState({
        title: '',
        author: '',
        description: '',
        image: null
        // may need to change this null to something else
    })

    console.log('this is book in createBook', book)
const handleChange = (e) => {
        setBook(prevBook => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

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
        //e equals the event
        e.preventDefault()   

        createBook(user, book)
            .then(() => {
                console.log('success')
            })
            .catch((err) => console.log(err))
    }

    return (
        <BookForm 
            book={ book } 
            handleChange={ handleChange } 
            handleSubmit={ handleSubmit }
            heading="Add a new book!"
        />
    )
}

export default CreateBook