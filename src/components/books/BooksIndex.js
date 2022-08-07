import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllBooks } from '../../api/books'
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
    const [error, setError] = useState(false)
    // const [img, setImg] = useState();
    const { msgAlert } = props
    const { favorites } = props

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
                if(list[i].id === book.id) {
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
                <img src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`}></img>
                <Card.Text>
                    <Link to={`/books/`}>View { book.volumeInfo.title }</Link>
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


    return (
        <div style={ cardContainerStyle }>
            {  bookCards }
        </div>
    )
}

export default BooksIndex