import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchApi';
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
import { useAppDispatch, useAppSelector } from '../../store';
import axios from 'axios';
import { Playlist } from '../../types/playlist';

interface IProps {
  uriTracks: string[];
}

interface IForm {
  title: string;
  description: string;
}

type TValidateForm = () => boolean;

const CreatePlaylistForm: React.FC<IProps> = ({ uriTracks }) => {
  const accessToken: string = useAppSelector((state) => state.auth.accessToken);
  const userId: string | undefined = useAppSelector((state) => state.auth.user?.id);
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<IForm>({
    title: '',
    description: '',
  });

  const [errorForm, setErrorForm] = useState<IForm>({
    title: '',
    description: '',
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> & ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrorForm({ ...errorForm, [name]: '' });
  }

  const validateForm: TValidateForm = () => {
    let isValid: boolean = true;

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

  const handleSubmit: FormEventHandler<HTMLDivElement> & FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (uriTracks.length > 0) {
        try {
          const responseCreatePlaylist: Playlist = await createPlaylist(accessToken, userId, {
            name: form.title,
            description: form.description,
          });

          await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);

          toast.success(' created successfully');

          setForm({ title: '', description: '' });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              dispatch(logout());
            }
          } else if (error instanceof Error) {
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
        <FormControl isInvalid={errorForm.title.length > 0} isRequired>
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

        <FormControl isInvalid={errorForm.description.length > 0} isRequired>
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

export default CreatePlaylistForm;
