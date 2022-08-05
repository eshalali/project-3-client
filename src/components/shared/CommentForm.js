import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'

const CommentForm = (props) => {
    const { comment, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="note">Comment</Form.Label>
                <Form.Control
                    placeholder="Comment"
                    name="note"
                    id="note"
                    value={ comment.note }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CommentForm