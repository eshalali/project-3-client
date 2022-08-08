import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllBooks, getLocalBooks } from '../../api/books'
import messages from '../shared/AutoDismissAlert/messages'
import AddFavorite from '../favorites/AddFavorite'
import RemoveFavorite from '../favorites/RemoveFavorite'



// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const BooksIndex = (props) => {
    const [books, setBooks] = useState(null)
    const [localBooks, setLocalBooks] = useState([])
    const [error, setError] = useState(false)
    // const [img, setImg] = useState();
    const { msgAlert } = props
    const { favorites } = props
    const { user } = props

    // console.log('Props in BooksIndex', props)
    //res.data.books should grab local books
    useEffect(() => {
        console.log(props)
        getAllBooks()            
            .then(res => setBooks(res.data.data))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Books',
                    message: messages.getBooksFailure,
                    variant: 'danger',
                })
                setError(true)
            })

    }, [])

    useEffect(() => {
        getLocalBooks()
            .then(res => {
                console.log(res)
                setLocalBooks(res.data.books)})
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Books',
                    message: messages.getBooksFailure,
                    variant: 'danger',
                })
                setError(true)
            })

    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If books haven't been loaded yet, show a loading message
    if (!books) {
        return <LoadingScreen />
    } else if (books.length === 0) {
        return <p>No books yet. Better add some.</p>
    }

    if (!localBooks) {
        return <LoadingScreen />
    } else if (localBooks.length === 0) {
        return <p>No books yet. Better add some.</p>
    }

    const addRemoveFavorite = (book, list) => {
            for (let i = 0; i<list.length; i++) {
                if(list[i].id === book.id) {
                    console.log('working')
                    return true
                }
            }
            return false
    }

    const addRemoveLocalFavorite = (book, list) => {
        for (let i = 0; i<list.length; i++) {
            if(list[i]._id === book._id) {
                console.log('working')
                return true
            }
        }
        return false
    }

    const bookCards = books.map(book => (
        <Card style={{ width: '30%', margin: 5}} key={ book.id }>
            <Card.Header>{ book.volumeInfo.title }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <p>Click for google</p>
                    <a href={`${book.volumeInfo.previewLink}`} target="_blank" rel="noopener noreferrer">
                        <img src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`}></img>
                    </a>
                </Card.Text>
                <Card.Text>
                    <Link to={`/books/google/:id`}>View { book.volumeInfo.title }</Link>
                </Card.Text>
                { addRemoveFavorite(book, favorites)
                    ?  
                    <div onClick={() => props.handleRemoveClick(book)} className='controls'>
                        <RemoveFavorite /> 
                    </div>  
                    :     
                    <div onClick={() => props.handleFavoriteClick(book)} className='controls'>
                        <AddFavorite />
                    </div>        
                }
            </Card.Body>
        </Card>
    ))

    const localBookCards = localBooks.map(book => (
        
        <Card style={{ width: '30%', margin: 5}} key={ book.id }>
            <Card.Header>{ book.title }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/books/local/:id`}>View { book.title }</Link>
                </Card.Text>
                { addRemoveLocalFavorite(book, favorites)
                    ?  
                    <div onClick={() => props.handleRemoveClick(book)} className='controls'>
                        <RemoveFavorite /> 
                    </div>  
                    :     
                    <div onClick={() => props.handleFavoriteClick(book)} className='controls'>
                        <AddFavorite />
                    </div>        
                }
            </Card.Body>
        </Card>
    ))


    return (
        <div style={ cardContainerStyle }>
            {  bookCards }
            { localBookCards }
        </div>
    )
}

export default BooksIndex