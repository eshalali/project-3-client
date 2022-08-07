import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createComment = (user, bookId, newComment) => {
    console.log('the user in createComment', user)
    console.log('the newComment in createComment', newComment)
	return axios({
		url: `${apiUrl}/comments/google/${bookId}`,
		method: 'POST',
		data: { comment: newComment }
	})
}

// UPDATE comment
export const updateComment = (user, bookId, updatedComment) => {
    console.log('this is updatedComment', updatedComment)
	return axios({
		url: `${apiUrl}/comments/${bookId}/${updatedComment._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { comment: updatedComment }
	})
}

// DELETE comment
export const deleteComment = (user, bookId, comment) => {
	return axios({
		url: `${apiUrl}/comments/${commentId}/${commentId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
	}