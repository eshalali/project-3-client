import { 
    Form,
    Button,
    Container 
} from 'react-bootstrap'

const BookForm = (props) => {

    const { book, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                    placeholder="What is this book's title?"
                    name="title"
                    id="title"
                    value={ book.title }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="author">Author</Form.Label>
                <Form.Control
                    placeholder="Who is the author of this book?"
                    name="author"
                    id="author"
                    value={ book.author }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    placeholder="Give a brief description of the book?"
                    type="text"
                    name="description"
                    id="description"
                    value={ book.description }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="uploadImage">Image</Form.Label>           
                    <Form.Control 
                        placeholder="Upload image"
                        type="file" 
                        id="uploadImage" 
                        name="uploadImage"
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default BookForm




