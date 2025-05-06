import React, { useState, useEffect } from 'react';
import { createBook, updateBook } from '../../services/books';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

const BookForm = ({ book, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publishedYear, setPublishedYear] = useState('');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description || '');
      setPublishedYear(book.publishedYear || '');
    } else {
      resetForm();
    }
  }, [book]);

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setDescription('');
    setPublishedYear('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = { title, author, description, publishedYear };
    
    try {
      if (book) {
        await updateBook(book._id, bookData);
      } else {
        await createBook(bookData);
      }
      resetForm();
      onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="title" label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="author" label="Author" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="description" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel controlId="publishedYear" label="Published Year" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Published Year"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
        />
      </FloatingLabel>

      <div className="d-grid gap-2">
        <Button variant="primary" type="submit" size="lg">
          {book ? 'Update Book' : 'Add Book'}
        </Button>
        {book && (
          <Button variant="secondary" size="lg" onClick={() => onUpdate()}>
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
};

export default BookForm;