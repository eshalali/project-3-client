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
    const [error, setError] = useState(false)
    // const [img, setImg] = useState();
    const { msgAlert } = props
    const { favorites } = props
    const { user } = props

    console.log('Props in BooksIndex', props)
    //res.data.books should grab local books
    useEffect(() => {
        console.log(props)
        getAllBooks()    
        // getLocalBooks()    
        .then(res => setBooks(res.data.books))
        .catch(err => {
            msgAlert({
                heading: 'Error Getting Books',
                message: messages.getBooksFailure,
                variant: 'danger',
            })
            setError(true)
        })

    }, [])

    //                 async function getDb() {
    //                     let books = {}
    //                     let localBooks = null 
    //                     let apiBooks = null
    //                     localBooks = await getLocalBooks()
    //                     apiBooks = await getAllBooks()
    //                     console.log(localBooks.data.books)
    //                     console.log(apiBooks.data.data)
    //                     if (apiBooks.length) {
    //                         apiBooks.map((book) =>{
    //                         books.title = book.data.volumeInfo.title
    //                         books.authour = book.data.volumeInfo.authour
    //                         books.description = book.data.volumeInfo.description
    //                     })   
    //                     }
                        
    //                     console.log('here are the books', books)
    //                 }
    // //attempting to get local api to show with google api
    //             useEffect(function() { 
    //                 getDb()
                    
                    
                
    //             }, [])



                
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
            <Card.Header>{ book.title }</Card.Header>
            <Card.Body>
            <img src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`}></img>
                <Card.Text>
                    <Link to={`/books/local/${book.id}`}>View: { book.title }</Link>
                </Card.Text>
                <Card.Text>
                    <a href={`${book.volumeInfo.previewLink}`} target="_blank" rel="noopener noreferrer">
                        <img src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`}></img>
                    </a>
                </Card.Text>
                <Card.Text>
                    <Link to={`/book/:id`}>View { book.volumeInfo.title }</Link>
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

    // const localBookCards = books.map(book => (
    //     <Card style={{ width: '30%', margin: 5}} key={ book.id }>
    //         <Card.Header>{ book.volumeInfo.title }</Card.Header>
    //         <Card.Body>
    //         <img></img>
    //             <Card.Text>
    //                 <Link to={`/books/local/${book.id}`}>View: { book.title }</Link>
    //             </Card.Text>
    //         </Card.Body>
    //     </Card>
    // ))



    return (
        <div style={ cardContainerStyle }>
            {  bookCards }
        </div>
    )
}
export default BooksIndex


// make asecond use effect with something like books.find()
//then make a second card set like madeBooks or something to display the boks we make in the same place 