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

    const addRemoveFavorite = (book, list) => {
        for (let i = 0; i<list.length; i++) {
            if(list[i]._id === book._id && user._id === book.userId) {
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