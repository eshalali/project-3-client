import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneBook, updateBook, removeBook } from '../../api/books'
import messages from '../shared/AutoDismissAlert/messages'
import EditBookModal from './EditBookModal'
import NewCommentModal from '../comments/NewCommentModal'
import ShowComment from '../comments/ShowComment'
import deleteComment from '../../api/comments'

// We need to get the book's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the Comment cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowBook = (props) => {
    const [book, setBook] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [commentModalShow, setCommentModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOneBook(id)
        // .then(res => console.log(res.data))

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
        console.log(book)
    // here we'll declare a function that runs which will remove the book
    // this function's promise chain should send a message, and then go somewhere
    const removeTheBook = () => {
        removeBook(user, book._id)
            // on success send a success message
            .then(() => {
                console.log('this is the user\n', user)
                console.log('this is the bookId\n', book._id)

                msgAlert({
                    heading: 'Success',
                    message: messages.removeBookSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/books')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing book',
                    message: messages.removeBookFailure,
                    variant: 'danger'
                })
            })
    }
    let commentCards 
    if (book) {
        if (book.comments.length > 0) {
            commentCards = book.comments.map((comment) => {
                console.log('this is our comment in our book from map', comment)
                return <ShowComment  
                    key={comment._id}
                    comment={comment}
                    book={book}
                    user={user}
                    msgAlert={msgAlert}
                    // triggerRefresh={() => setUpdated}
                />
            }   
            )
        }
    }

    if (!book) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ book.title }</Card.Header>
                    <img src={`${book.imageLink}`}/>
                    <Card.Body>
                            <div>Author: { book.author }</div>
                            <div>description: { book.description }</div>
                        
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setCommentModalShow(true)}
                            className="m-2" variant="info"
                        >
                            Add a comment!
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
                                    delete Book
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container>
                {commentCards}
            </Container>
            {/* <EditBookModal 
                user={user}
                book={book} 
                show={editModalShow} 
                updateBook={updateBook}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            /> */}
            <NewCommentModal 
                book={book}
                show={commentModalShow}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setCommentModalShow(false)} 
            /> 
        </>
    )
}

export default ShowBook



