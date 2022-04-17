import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import config from '../lib/config';
import { useDocumentTitle } from '../lib/customHooks';
import { getUserProfile } from '../lib/fetchApi';
import { login } from '../slice/authSlice';
import { Box, Button, Link, Text } from '@chakra-ui/react'

const Auth : React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useDocumentTitle('Auth - Spotipy');

  const setLogin = useCallback(async (accessToken, expiresIn) => {
    try {
      const responseUser = await getUserProfile(accessToken);

      dispatch(login({
        accessToken,
        expiredDate: +new Date() + expiresIn * 1000,
        user: responseUser,
      }));

      history.push('/create-playlist');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }, [dispatch, history]);

  useEffect(() => {
    const accessTokenParams: string | null = new URLSearchParams(window.location.hash).get('#access_token');
    const expiresIn: string | null = new URLSearchParams(window.location.hash).get('expires_in');

    if (accessTokenParams !== null) {
      setLogin(accessTokenParams, expiresIn);
    }
  }, [setLogin]);

  const buildSpotifyLinkAuthorize: () => string = () => {
    const state: string = Date.now().toString();
    const clientId: string | undefined = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return 'https://accounts.spotify.com/authorize?' +
      `client_id=${clientId}` +
      '&response_type=token' +
      `&redirect_uri=${config.HOST}` +
      `&state=${state}` +
      `&scope=${config.SPOTIFY_SCOPE}`;
  }

  return (
    <main>
      <Box className="center" gap={2}>
        <Text>Login for next step...</Text>

        <Link href={buildSpotifyLinkAuthorize()} _hover={{ textDecoration: 'none' }}>
          <Button>Authorize</Button>
        </Link>
      </Box>
      
    </main>
  )
}

export default Auth;
