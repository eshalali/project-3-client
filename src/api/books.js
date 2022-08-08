import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllBooks = () => {
    return axios(`${apiUrl}/books`)
}
// READ => INDEX
export const getLocalBooks = () => {
    return axios(`${apiUrl}/books`)
}


// READ => SHOW
export const getOneBook = (id) => {
    console.log("here is the ID", id)
    return axios(`${apiUrl}/books/local/${id}`)
}

// CREATE
export const createBook = (user, newBook) => {
    console.log('createbook in api was hit')
    // in our createbook form, we're building an object
    // when we pass that object into the api createBook function,
    // it's going to look like the books in our database
    // we're going to refer to this as newBook
    console.log('this is user', user)
    console.log('this is newBook', newBook)
	return axios({
		url: apiUrl + '/books',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { book: newBook }
	})
}

// UPDATE
export const updateBook = (user, updatedBook) => {
    // console.log('createBook in api was hit')
    // in our createBook form, we're building an object
    // when we pass that object into the api createBook function,
    // it's going to look like the books in our database
    // we're going to refer to this as newBook
    // console.log('this is user', user)
    console.log('this is updatedBook', updatedBook)
	return axios({
		url: `${apiUrl}/books/${updatedBook.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { book: updatedBook }
	})
}

// DELETE
export const removeBook = (user, bookId) => {
    return axios({
        url: `${apiUrl}/books/${bookId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}