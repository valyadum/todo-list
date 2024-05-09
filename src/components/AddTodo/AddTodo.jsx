import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonContainer, Form } from './AddTodo.styled';
import UnstyledInputIntroduction from './Input';
import EmptyTextarea from './TextArea';

function AddTodo() {
  const [newTodo, setNewTodo] = useState();
  const [newItem, setNewItem] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = data => {
    setNewTodo({ ...data, userId: 1 });
    setIsLoading(true);
    reset();
  };

  useEffect(() => {
    if (newTodo) {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(json => {
          setNewItem(json);
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false); 
        });
    }
  }, [newTodo]);

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Oops there's a mess: {error.message}
      </Typography>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          Add todo
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <UnstyledInputIntroduction register={register} />
          <EmptyTextarea register={register} />
          <ButtonContainer>
            <Button
              variant="outlined"
              type="button"
              onClick={() => {
                reset();
                setNewItem();
              }}
            >
              Clear
            </Button>
            <Button variant="outlined" type="submit">
              {isLoading ? <CircularProgress size={24} /> : 'Create'}
            </Button>
          </ButtonContainer>
        </Form>

        {newItem && (
          <Grid item xs={9} key={newItem.id}>
            <Card sx={{ width: 350 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {newItem.input}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {newItem.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default AddTodo;
