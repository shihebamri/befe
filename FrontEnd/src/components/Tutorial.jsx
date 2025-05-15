import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TutorialService from '../services/TutorialService';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Card, CardContent, CardActions } from '@mui/material';

const Tutorial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState({ title: '', description: '', published: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TutorialService.get(id)
      .then(response => {
        setTutorial(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    TutorialService.update(id, tutorial).then(() => navigate('/tutorials'));
  };

  if (loading) return <Typography align="center">Loading...</Typography>;

  return (
    <Card sx={{ maxWidth: 500, margin: '2rem auto', p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Edit Tutorial</Typography>
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
            <Button type="submit" variant="contained" color="primary" fullWidth>Update</Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default Tutorial;
