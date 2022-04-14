import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/customHooks'

export default function NotFound() {
  useDocumentTitle('Not Found - Spotipy')
  return (
    <Box as="main" className="center">
      <Text>No Content Here...</Text>
      <Link to="/create-playlist">
        <Button>
          Go to content
        </Button>
      </Link>
    </Box>
  )
}
