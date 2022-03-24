import React from 'react'
import dataSong from '../data/dataSong';
import Card from '../components/Card'

export default function Home() {
  return (
    <main className="container">
      <div className="cards">
        <Card
          imageUrl={dataSong.album.images[0].url}
          title={dataSong.name}
          artist={dataSong.artists[0].name}
        />
      </div>
    </main>
  )
}
