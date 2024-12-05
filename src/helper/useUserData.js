import { useState, useEffect } from 'react';
import { getCache } from './Storage';

const useUserData = () => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const data = await getCache('userData');
      setUserData(data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    userData,
    userId: userData?.user?.id || null,
  }
};

export default useUserData;
