import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneBook, updateBook, removeBook } from '../../api/books'
import messages from '../shared/AutoDismissAlert/messages'
import EditBookModal from './EditBookModal'
import NewToyModal from '../toys/NewToyModal'
import ShowToy from '../toys/ShowToy'

// We need to get the book's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the toy cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowBook = (props) => {
    const [book, setBook] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [toyModalShow, setToyModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the book in showBook', book)
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOneBook(id)
            .then(res => setBook(res.data.book))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting book',
                    message: messages.getBooksFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    // here we'll declare a function that runs which will remove the book
    // this function's promise chain should send a message, and then go somewhere
    const removeTheBook = () => {
        removeBook(user, book.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeBookSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing book',
                    message: messages.removeBookFailure,
                    variant: 'danger'
                })
            })
    }
    let toyCards
    if (book) {
        if (book.toys.length > 0) {
            toyCards = book.toys.map(toy => (
                <ShowToy 
                    key={toy._id}
                    toy={toy}
                    book={book}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if (!book) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ book.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Age: { book.age }</small></div>
                            <div><small>Type: { book.type }</small></div>
                            <div><small>
                                Adoptable: { book.adoptable ? 'yes' : 'no'}
                            </small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setToyModalShow(true)}
                            className="m-2" variant="info"
                        >
                            Give {book.name} a toy!
                        </Button>
                        {
                            book.owner && user && book.owner._id === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Book
                                </Button>
                                <Button onClick={() => removeTheBook()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Set {Book.name} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
                {toyCards}
            </Container>
            <EditBookModal 
                user={user}
                book={book} 
                show={editModalShow} 
                updateBook={updateBook}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
            <NewToyModal 
                book={book}
                show={toyModalShow}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setToyModalShow(false)} 
            />
        </>
    )
}

export default ShowBook


