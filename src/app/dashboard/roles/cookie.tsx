import { useEffect, useState } from 'react';

// Function to get a specific cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function GetAccessToken() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const tokenFromCookie = getCookie('accessToken'); // Ensure the cookie name matches
    setAccessToken(tokenFromCookie);
  }, []);

  return (
    <div>
      {accessToken ? `Access Token: ${accessToken}` : 'No access token found'}
    </div>
  );
}
