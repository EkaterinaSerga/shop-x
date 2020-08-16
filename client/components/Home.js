import React from 'react'
import {Link} from 'react-router-dom'

export default function Home() {
  return (
    <div
      style={{
        backgroundImage:
          'url(' +
          'https://i1.pickpik.com/photos/977/476/923/596878fc2d723-preview.jpg' +
          ')',
        backgroundPosition: 'center',
        // backgroundSize: 'cover',
        height: '100vh',
        backgroundRepeat: 'repeat',
        color: 'black'
      }}
    >
      {/* <Link to={'/login'} styles={{ backgroundImage:'url(https://i1.pickpik.com/photos/977/476/923/596878fc2d723-preview.jpg)' }}>
      Your experience starts here
    </Link> */}
      <h1
        style={{
          textAlign: 'center',
          padding: 50
        }}
      >
        ShopX
      </h1>
      <h2
        style={{
          textAlign: 'center',
          padding: 50
        }}
      >
        Your experience starts here
      </h2>
      <Link
        to="/login"
        style={{
          alignSelf: 'center'
        }}
      >
        Sign in
      </Link>
    </div>
  )
}
