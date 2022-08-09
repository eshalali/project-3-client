// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import BooksIndex from './components/books/BooksIndex'
import ShowBook from './components/books/ShowBook'
import FavoritesIndex from './components/favorites/FavoritesIndex'
// import { getAllBooks } from './api/books'

const App = () => {

	const [user, setUser] = useState(null)
	const [favorites, setFavorites] = useState([])
	// const [books, setBooks] = useState([])
	const [msgAlerts, setMsgAlerts] = useState([])

	console.log('user in app', user)
	console.log('message alerts', msgAlerts)
	
	const clearUser = () => {
		console.log('clear user ran')
		setUser(null)
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
			)
		})
	}

	useEffect(() => {
		const bookFavorites = JSON.parse(
			localStorage.getItem('book-favorites')
		);

		if (bookFavorites) {
			setFavorites(bookFavorites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('book-favorites', JSON.stringify(items));
	};
	
	const handleFavoriteClick = (book) => {
		if (!book.userId) {
			book.userId = user._id
		}
		// console.log(favorites)
		const status = false
		// console.log(status)

		function constainsBook(obj) {
			for (let i = 0; i<favorites.length; i++) {
				// console.log('favorites id', favorites[i]._id)
				// console.log('obj id', obj._id)
				// console.log('user id', user._id)
				// console.log('book user id', book.userId)
				if(favorites[i]._id === obj._id && user._id === favorites[i].userId) {
					return status = true
				}
			}
			// console.log(status)
			return
		}
		constainsBook(book, favorites)
		console.log('status', status)
		if (!status && user) {
			const newFavoriteList = [...favorites, book]
			// console.log('working')
			setFavorites(newFavoriteList);
			saveToLocalStorage(newFavoriteList);
		}
	};

	const handleRemoveClick = (book) => {
		const updateFavoriteList = favorites.filter(
			(favorite) => favorite._id !== book._id && favorite.userId !== book.userId
		);
		
		if (user._id === book.userId) {
			console.log('current user', user._id)
			console.log('book user', book.userId)
			setFavorites(updateFavoriteList);
			saveToLocalStorage(updateFavoriteList);
		}
	};

		return (
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-out'
						element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} setFavorites={setFavorites}/>
						</RequireAuth>
						}
					/>
					<Route
						path='/change-password'
						element={
							<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					<Route
						path='/books'
						element={
							<BooksIndex 
								msgAlert={msgAlert} clearUser={clearUser} user={user} 
								handleFavoriteClick={handleFavoriteClick} favorites={ favorites } 
								handleRemoveClick={handleRemoveClick}
							/>							
						}
					/>
					<Route
						path='/books/google/:id'
						element={
							<ShowBook msgAlert={msgAlert} clearUser={clearUser} user={user} />							
						}
					/>
					<Route
						path='/favorites'
						element={
							<FavoritesIndex 
							msgAlert={msgAlert} clearUser={clearUser} user={user} 
							handleFavoriteClick={handleFavoriteClick} favorites={ favorites } 
							handleRemoveClick={handleRemoveClick}/>							
						}
					/>
				</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
			</Fragment>
		)
}

export default App
