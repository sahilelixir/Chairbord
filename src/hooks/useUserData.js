import { useEffect, useState } from "react";
import { getCache } from "../helper/Storage";

const useUserData = () => {
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(0);
    const [loading, setLoading] = useState(true);

    const getUserData = async () => {
        try {
            const cachedData = await getCache('userData');
            setUserData(cachedData);
            setUserId(cachedData.user.id)
        } catch (error) {
            console.error("Error retrieving user data:", error);
            setUserData(null); // Set to null in case of an error
        } finally {
            setLoading(false); // Loading complete
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return { userData, loading, userId };
};

export default useUserData;
