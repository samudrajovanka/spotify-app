import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchApi';
import PropTypes from 'prop-types';
import { logout } from '../../slice/authSlice';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Button,
  HStack,
  VStack,
  Heading
} from '@chakra-ui/react';

export default function CreatePlaylistForm({ uriTracks }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const [errorForm, setErrorForm] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrorForm({ ...errorForm, [name]: '' });
  }

  const validateForm = () => {
    let isValid = true;

    if (form.title.length < 10) {
      setErrorForm({
        ...errorForm,
        title: 'Title must be at least 10 characters long',
      });
      isValid = false;
    }

    if (form.description.length > 100) {
      setErrorForm({
        ...errorForm,
        description: 'Description must be less than 100 characters long',
      });
      isValid = false;
    }

    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (uriTracks.length > 0) {
        try {
          const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
            name: form.title,
            description: form.description,
          });

          await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);

          toast.success('Playlist created successfully');

          setForm({ title: '', description: '' });
        } catch (error) {
          if (error.response.status === 401) {
            dispatch(logout());
          } else {
            toast.error(error.message);
          }
        }
      } else {
        toast.error('Please select at least one track');
      }
    }
  }

  return (
    <VStack justify="center">
      <Box>
        <Heading as="h3" size="lg">Create Playlist</Heading>
      </Box>

      <Box
        as="form"
        onSubmit={handleSubmit}
        className="form"
        mt={6}
        width={{ base: '100%', sm: '400px' }}
      >
        <FormControl isInvalid={errorForm.title} isRequired>
          <FormLabel htmlFor="title-playlist">Title</FormLabel>
          <Input
            id="title-playlist"
            name="title"
            onChange={handleChange}
            value={form.title}
            placeholder="Title of playlist"
          />
          {errorForm.title && (
            <FormErrorMessage>{errorForm.title}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={errorForm.description} isRequired>
          <FormLabel htmlFor="description-playlist">Description</FormLabel>
          <Textarea
            id="description-playlist"
            placeholder="Description of playlist"
            value={form.description}
            name="description"
            onChange={handleChange}
          />
          {errorForm.description && (
            <FormErrorMessage>{errorForm.description}</FormErrorMessage>
          )}
        </FormControl>

        <HStack justify="flex-end">
          <Button type="submit">Create</Button>  
        </HStack>
      </Box>
    </VStack>
  )
}

CreatePlaylistForm.propTypes = {
  uriTracks: PropTypes.array.isRequired,
};
