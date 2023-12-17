import React from 'react';
import {jwtDecode} from 'jwt-decode';
import { useLocation } from 'react-router-dom';

function JwtDecodePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  let decodedToken = {};

  try {
    if (token) {
      decodedToken = jwtDecode(token);
    }
  } catch (error) {
    console.error('Invalid JWT token', error);
  }

  return (
    <div>
      <h2>Decoded JWT Token:</h2>
      {token && <pre>{JSON.stringify(decodedToken, null, 2)}</pre>}
      {!token && <p>No token provided</p>}
    </div>
  );
}

export default JwtDecodePage;