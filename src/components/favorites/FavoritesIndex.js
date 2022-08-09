import { useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import AddFavorite from '../favorites/AddFavorite'
import RemoveFavorite from '../favorites/RemoveFavorite'

const FavoritesIndex = (props) => {
    const { favorites } = props
    const { user } = props

    const cardContainerStyle = {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center'
    }

    const { showModal, setShowModal } = props

    const addRemoveFavorite = (book) => {
        // console.log('book',  book)
            for (let i = 0; i<favorites.length; i++) {
                // console.log('list id', favorites[i]._id)
                // console.log('book id', book._id)
                // console.log('user id', user._id)
                // console.log('book user id', favorites[i].userId)
                if(favorites[i]._id === book._id && user._id === favorites[i].userId) {
                    return true
                }
            }
            return false
    }

    const favoriteBooks = favorites.map(book => {
        if (book.userId === user._id) {
            return (
                <Card style={{ width: '30%', margin: 5}} key={ book._id }>
                    <Card.Header>
                        <Link to={`/book/${book._id}`}>View { book.title }</Link>
                    </Card.Header>
                    <Card.Body>
                        <img src={`${book.imageLink}`} />
                        { addRemoveFavorite(book)
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
            )
        }    
    })
                
	return (
        <>  
            <div style={ cardContainerStyle }>             
                { favoriteBooks }
            </div>

        </>
        
	);
};

export default FavoritesIndex;