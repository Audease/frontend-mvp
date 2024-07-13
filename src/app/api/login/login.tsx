// pages/api/login.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    const response = await axios.post(
      'https://audease-dev.onrender.com/v1/auth/login',
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data;

      res.setHeader('Set-Cookie', [
        `accessToken=${accessToken}; HttpOnly; Secure; Path=/; Max-Age=900`,
        `refreshToken=${refreshToken}; HttpOnly; Secure; Path=/; Max-Age=604800`,
      ]);

      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
