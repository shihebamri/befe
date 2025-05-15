import React, { useEffect, useState } from 'react';
import TutorialService from '../services/TutorialService';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Card, CardContent, CircularProgress } from '@mui/material';

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TutorialService.getAll()
      .then(response => {
        setTutorials(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}><CircularProgress /></div>;

  return (
    <Card sx={{ maxWidth: 600, margin: '2rem auto', p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Tutorials List</Typography>
        <List>
          {tutorials.map(tutorial => (
            <ListItem button component={Link} to={`/tutorials/${tutorial.id}`} key={tutorial.id} divider>
              <ListItemText primary={tutorial.title} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TutorialsList;
