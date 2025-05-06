import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

const BookItem = ({ book, onDelete, onEdit }) => {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
        {book.description && (
          <Card.Text className="text-truncate">{book.description}</Card.Text>
        )}
        {book.publishedYear && (
          <Card.Text>
            <small className="text-muted">Published: {book.publishedYear}</small>
          </Card.Text>
        )}
      </Card.Body>
      <Card.Footer>
        <ButtonGroup className="w-100">
          <Button variant="outline-primary" size="sm" onClick={() => onEdit(book)}>
            Edit
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => onDelete(book._id)}>
            Delete
          </Button>
        </ButtonGroup>
      </Card.Footer>
    </Card>
  );
};

export default BookItem;