import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../lib/customHooks';

const NotFound: React.FC = () => {
  useDocumentTitle('Not Found - Spotipy');

  return (
    <Box as="main" className="center" gap={2}>
      <Text>No Content Here...</Text>
      <Link to="/create-playlist">
        <Button>
          Go to content
        </Button>
      </Link>
    </Box>
  )
}

export default NotFound;
