import { Box, Button, Image } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import notFoundGif from '../../assets/gif/notFound.gif';
import Seo from '../../components/Seo';

const NotFound: React.FC = () => {

  return (
    <>
      <Seo
        title="Not Found"
      />

      <Box as="main" className="center" gap={2}>
        <Image
          src={notFoundGif}
          alt="not found gif"
          boxSize="300px"
        />
        <Link to="/create-playlist">
          <Button>
            Go to content
          </Button>
        </Link>
      </Box>
    </>
  )
}

export default NotFound;
