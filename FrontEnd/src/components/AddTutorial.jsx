import React, { useState } from 'react';
import TutorialService from '../services/TutorialService';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Card, CardContent, CardActions, Alert } from '@mui/material';

const AddTutorial = () => {
  const [tutorial, setTutorial] = useState({ title: '', description: '', published: false });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    TutorialService.create(tutorial).then(() => {
      setSubmitted(true);
      setTimeout(() => navigate('/tutorials'), 1000);
    });
  };

  return (
    <Card sx={{ maxWidth: 500, margin: '2rem auto', p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Add Tutorial</Typography>
        {submitted ? (
          <Alert severity="success">Submitted successfully!</Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={tutorial.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="description"
              value={tutorial.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="published"
                  checked={tutorial.published}
                  onChange={e => setTutorial({ ...tutorial, published: e.target.checked })}
                />
              }
              label="Published"
            />
            <CardActions>
              <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
            </CardActions>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default AddTutorial;
