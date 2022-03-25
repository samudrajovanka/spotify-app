import React from 'react'
import dataSong from '../data/dataSong';
import Card from '../components/Card'

export default function Home() {
  return (
    <main className="container">
      <div className="cards">
        {dataSong.map((song) => (
          <Card
            key={song.id}
            imageUrl={song.album.images[0].url}
            title={song.name}
            artist={song.artists[0].name}
          />
        ))}
      </div>
    </main>
  )
}
