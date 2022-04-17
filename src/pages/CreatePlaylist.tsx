import React, { useEffect, useState } from 'react'
import Track from '../components/Track';
import SearchBar from '../components/SearchBar';
import CreatePlaylistForm from '../components/CreatePlaylistForm';
import { useDocumentTitle } from '../lib/customHooks';
import Layout from '../components/Layout';
import { Box, Divider, Grid, Text } from '@chakra-ui/react';

type TOnSuccessSearch = (searchTracks: any[], query: string) => void;

const CreatePlaylist: React.FC = () => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState<string[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<any[]>([]);
  const [isInSearch, setIsInSearch] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('No tracks');
  useDocumentTitle('Create Playlist - Spotipy');

  useEffect(() => {
    if (!isInSearch) {
      setTracks(selectedTracks);
    }
  }, [selectedTracksUri, selectedTracks, isInSearch]);

  const onSuccessSearch: TOnSuccessSearch = (searchTracks, query) => {
    setIsInSearch(true);

    const selectedSearchTracks = searchTracks.filter((track) => selectedTracksUri.includes(track.uri));

    setTracks((prevState: any[]): any[] => {
      const _tracks = [...new Set([...selectedSearchTracks, ...searchTracks])];

      if (_tracks.length === 0) {
        setMessage(`No tracks found with query "${query}"`);
      } else {
        setMessage('');
      }

      return _tracks;
    });
  }

  const clearSearch: () => void = () => {
    setTracks(selectedTracks);
    setMessage('No tracks');
    setIsInSearch(false);
  }

  const toggleSelect: (track: any) => void = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item: any) => item !== uri));
      setSelectedTracks(selectedTracks.filter((item: any) => item.uri !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  }

  return (
    <Layout>
      <Box as="main" className="container" my={5}>
        <CreatePlaylistForm uriTracks={selectedTracksUri} />

        <Divider variant="dashed" my={10} />

        <SearchBar
          onSuccess={onSuccessSearch}
          onClearSearch={clearSearch}
        />

        <Box mt={10}>
          {(tracks.length === 0 ? ( 
            <Text>{message}</Text>
          ) : (
            <Grid
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              gap={5}
            >
              {tracks.map((track) => (
                <Track
                  key={track.id}
                  imageUrl={track.album.images[0].url}
                  title={track.name}
                  artist={track.artists[0].name}
                  select={selectedTracksUri.includes(track.uri)}
                  toggleSelect={() => toggleSelect(track)}
                />
              ))}
            </Grid>
          ))}
        </Box>
      </Box>
    </Layout>
  );
}

export default CreatePlaylist;
