const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h2>Scholastic Four's</h2>
			<h1>Book Nook</h1>
			<button>
				<a href="/sign-up"> Sign Up</a>
			</button>
			<button>
				<a href="/sign-in"> Sign In</a>
			</button>
		</>
	)
}

export default Home
