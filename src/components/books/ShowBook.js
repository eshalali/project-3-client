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
// import deleteComment from '../../api/comments'

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

            .then(res => setBook(res.data))
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
    const deleteComment = (comment) => {
        for (let i = 0; i < book.comments.length; i++) {
            if (book.comments[i] === comment) {
                book.comments.splice(i,1)
            }
        }
        setUpdated(prev => !prev)
    }


    let commentCards
    if (book) {
        if (book.comments) {
            commentCards = book.comments.map(comment => (
                // <ShowComment  
                //     // key={comment._id}
                //     comment={comment}
                //     book={book}
                //     user={user}
                //     msgAlert={msgAlert}
                //     triggerRefresh={() => setUpdated(prev => !prev)}
                // />
                <>
                <Card className='m-2'>
                {/* <Card.Header>{comment.owner}</Card.Header> */}
                <Card.Body>
                    <p>{comment.note}</p>
                </Card.Body>
                <Card.Footer>
                    {
                        user && user.id === comment.owner
                        ?
                        <>
                            <Button variant='warning' onClick={() => setEditModalShow(true)}>Edit Comment</Button>
                            <Button variant='danger' onClick={() => deleteComment()}>Delete Commment</Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
                </>
                // <p>{comment.note}</p>
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
                    <Card.Header>{ book.title }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div> <img src={`http://books.google.com/books/publisher/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72ogXuGL62ZnSbde4lgieUnyxbElGZLOwZKOM2utf5zw4JOHJPmelLVnvOg004ICmoMm2nyyyUb6iQN-2rC2RmKZGbiphdK0M8Py3yCsUBkMYlVfDgEmwp4bm-oMVex9TNIKEVP&source=gbs_api`}></img></div>
                            <div><small>Author: { book.volumeInfo.authors }</small></div>
                            <div>description: { book.volumeInfo.description }</div> 
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            user
                            ?
                            <Button onClick={() => setCommentModalShow(true)}
                                className="m-2" variant="info"
                            >
                                Give {book.name} a comment!
                            </Button>
                            :
                            null
                        }
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
                                    Set {book.name} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
                {commentCards}
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



