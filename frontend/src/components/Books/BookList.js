import React, { useState, useEffect, useContext } from 'react';
import { getBooks, deleteBook } from '../../services/books';
import BookItem from './BookItem';
import BookForm from './BookForm';
import AuthContext from '../../context/AuthContext';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      fetchBooks();
    }
  }, [token]);

  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (err) {
      setError('Failed to fetch books');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (err) {
      setError('Failed to delete book');
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="text-center">
                {editingBook ? 'Edit Book' : 'Add New Book'}
              </Card.Title>
              <BookForm 
                book={editingBook} 
                onUpdate={() => {
                  setEditingBook(null);
                  fetchBooks();
                }} 
              />
            </Card.Body>
          </Card>

          {error && <Alert variant="danger">{error}</Alert>}

          <h2 className="text-center mb-4">My Books</h2>
          
          {books.length === 0 ? (
            <Card>
              <Card.Body className="text-center">
                No books found. Add your first book!
              </Card.Body>
            </Card>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {books.map(book => (
                <Col key={book._id}>
                  <BookItem 
                    book={book} 
                    onDelete={handleDelete} 
                    onEdit={() => setEditingBook(book)} 
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookList;