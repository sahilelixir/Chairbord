import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import StackNavigation from "./src/navigation/Stack/StackNavigation";
import { OrdersProvider } from './src/orderContext/OrderContext';
import DrawerNavigation from './src/navigation/Drawer/DrawerNavigation';
import { disconnectSocket, initializeSocket, serverURL } from './src/utils/socket';
import { useEffect, useState } from 'react';
import { getCache } from './src/helper/Storage';
import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

function App({ }): React.JSX.Element {
  const [socket, setSocket] = useState<any>(null);
  const [userData, setUserData] = useState<any>();

  // Fetch user data and set it to state
  const getUserData = async () => {
    const userData = await getCache('userData');
    setUserData(userData);
  };

  // Request multiple permissions
  const requestPermissions = async () => {
    const permissions = [
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_CONTACTS,
    ];

    for (const permission of permissions) {
      const result = await check(permission);
      if (result !== RESULTS.GRANTED) {
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          console.log(`${permission} granted`);
        } else {
          console.log(`${permission} denied`);
        }
      }
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    getUserData();
    requestPermissions(); // Request permissions on mount
  }, []);

  // Initialize socket only when userData is available
  useEffect(() => {
    if (userData?.user?.id) {
      const socket: any = initializeSocket(serverURL, userData.user.id);
      setSocket(socket);

      socket.on("connect", () => {
        console.log("Connected to the server!");
      });

      // Clean up and disconnect socket on unmount
      return () => {
        disconnectSocket();
      };
    }
  }, [userData]);

  return (
    <OrdersProvider>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </OrdersProvider>
  );
}

export default App;
