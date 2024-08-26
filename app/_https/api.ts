import { useMutation } from 'react-query';  

export const api = {
  devApi: {
    baseUrl: "https://dummyjson.com/",
    login: "auth/login",
  },
};

export const loginFetch = async (username: string, password: string, expiresInMins: number) => {
  const response = await fetch(`${api.devApi.baseUrl}${api.devApi.login}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins
    })
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};


export const useLoginApiService = () => {
  const mutation = useMutation(({ username, password, expiresInMins }: { username: string, password: string, expiresInMins: number }) => 
    loginFetch(username, password, expiresInMins)
  );

  return {
    loginService: mutation.mutate,    
    loading: mutation.isLoading,      
    error: mutation.error,            
  };
};
