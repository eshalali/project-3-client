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
    // const [localBooks, setLocalBooks] = useState([])
    const [error, setError] = useState(false)
    // const [img, setImg] = useState();
    const { msgAlert } = props
    const { favorites } = props
    const { user } = props

    // console.log('Props in BooksIndex', props)
    //res.data.books should grab local books

    useEffect(() => {
        getAllBooks()
            .then(res => {
                setBooks(res.data.books)})
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


    const addRemoveFavorite = (book, list) => {
            for (let i = 0; i<list.length; i++) {
                if(list[i]._id === book._id && user._id === book.userId) {
                    console.log('list',list[i]._id)
                    console.log('book use', book.userId)
                    return true
                }
            }
            return false
    }


    const bookCards = books.map(book => (
        <Card style={{ width: '30%', margin: 5}} key={ book._id }>
            <Card.Header>
                <Link to={`/books/${book._id}`}>{ book.title }</Link>
            </Card.Header>
            <Card.Body>
                <img src={`${book.imageLink}`} />
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

    return (
        <div style={ cardContainerStyle }>
            {  bookCards }
        </div>
    )
}

export default BooksIndex