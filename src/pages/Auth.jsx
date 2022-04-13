import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import config from '../lib/config';
import { useDocumentTitle } from '../lib/customHooks';
import { getUserProfile } from '../lib/fetchApi';
import { login } from '../slice/authSlice';

export default function Auth() {
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
      toast.error(error.message);
    }
  }, [dispatch, history]);

  useEffect(() => {
    const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');
    const expiresIn = new URLSearchParams(window.location.hash).get('expires_in');

    if (accessTokenParams !== null) {
      setLogin(accessTokenParams, expiresIn);
    }
  }, [setLogin]);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return 'https://accounts.spotify.com/authorize?' +
      `client_id=${clientId}` +
      '&response_type=token' +
      `&redirect_uri=${config.HOST}` +
      `&state=${state}` +
      `&scope=${config.SPOTIFY_SCOPE}`;
  }

  return (
    <main className="center">
      <p>Login for next step...</p>
      <Button href={getSpotifyLinkAuthorize()} external>Authorize</Button>
    </main>
  )
}
