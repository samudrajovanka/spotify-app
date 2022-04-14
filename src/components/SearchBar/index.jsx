import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { searchTrack } from '../../lib/fetchApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slice/authSlice';
import { FaSearch } from "react-icons/fa";
import { Box, Button, Flex, Input } from '@chakra-ui/react';

export default function SearchBar({ onSuccess, onClearSearch }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [text, setText] = useState('');
  const [isClear, setIsClear] = useState(true);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await searchTrack(text, accessToken);

      const tracks = response.tracks.items;
      onSuccess(tracks, text);
      setIsClear(false);
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(logout());
      } else {
        toast.error(error.message);
      }
    }
  }

  const handleClear = () => {
    onClearSearch();
    setText('');
    setIsClear(true);
  }

  return (
    <Box>
      <Flex as="form" gap={3} onSubmit={handleSubmit}>
        <Input
          placeholder="Search track..."
          required
          value={text}
          onChange={handleInput}
        />
        <Button type="submit"><FaSearch /></Button>
      </Flex>

      {!isClear && (
        <Button variant="link" onClick={handleClear} mt={1}>Clear search</Button>
      )}
    </Box>
  )
}

SearchBar.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};
