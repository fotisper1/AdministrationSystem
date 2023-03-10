

export const handleResponseEmployee= async (response:any) => {
  if (response.ok) {
    return response;
  }

  if (response.status === 401 || response.status === 403) {
    const originalRequest = response.clone();
    if (!originalRequest._retry) {
      originalRequest._retry = true;
      try {
        let accessToken = localStorage.getItem('accessToken');
        let refreshToken = localStorage.getItem('refreshToken');
        console.log(refreshToken)
        const renewResponse = await fetch(`http://localhost:3000/auth-employee/renew/${localStorage.getItem('id')}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
          },
          body: JSON.stringify({ token: refreshToken })
        });

        const renewData = await renewResponse.json();
        localStorage.setItem('accessToken',renewData.accessToken)
        localStorage.setItem('refreshToken',renewData.refreshToken)

        const newResponse = await fetch(originalRequest.url, {
          ...originalRequest,
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + renewData.accessToken
          }
        });

        return newResponse;
      } catch (err) {
        console.error(err);
        return Promise.reject(response);
      }
    }
  }
  return Promise.reject(response);
};
