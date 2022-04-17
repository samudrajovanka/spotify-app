import React, { useEffect } from 'react';
import CreatePlaylist from './pages/CreatePlaylist';
import { useLocation, Switch, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import GuardRoute from './components/GuardRoute';
import NotFound from './pages/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './slice/authSlice';
import { TRootState } from './store';

const App: React.FC = () => {
  const { pathname }: { pathname: string } = useLocation();
  const dispatch = useDispatch();
  const accessTokenState: string = useSelector((state: TRootState) => state.auth.accessToken);

  useEffect(() => {
    const accessToken: string | null = localStorage.getItem('accessToken');

    if (accessToken) {
      const expiredDate: string | null = localStorage.getItem('expiredDate');

      if (+(expiredDate as string) < +new Date()) {
        dispatch((logout()));
      } else if (!accessTokenState) {
        const user: string = JSON.parse(localStorage.getItem('user') || "");
        dispatch(login({
          accessToken,
          user,
          expiredDate,
        }));
      }
    }
  }, [accessTokenState, dispatch, pathname]);

  return (
    <Switch>
      <GuardRoute path="/create-playlist" type="private" exact>
        <CreatePlaylist />
      </GuardRoute>
      <GuardRoute path="/" type="guest" exact>
        <Auth />
      </GuardRoute>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
