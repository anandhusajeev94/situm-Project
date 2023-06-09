import {Platform} from 'react-native';
import {
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';

enum PermissionsRequestResultTypes {
  GRANTED,
  NOT_GRANTED,
}

export interface PermissionsRequestResult {
  result: PermissionsRequestResultTypes;
}

async function requestPermissions(): Promise<PermissionsRequestResult> {
  return new Promise(async (resolve, reject) => {
    console.log('Retrieving permissions for platform ' + Platform.OS);
    if (Platform.OS === 'ios') {
      const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (granted === RESULTS.GRANTED) {
        console.info('LOCATION_WHEN_IN_USE permission granted');

        if (Platform.OS == 'ios' && parseInt(Platform.Version, 10) > 12) {
          let granted = await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);

          if (granted === RESULTS.GRANTED) {
            console.log('BLUETOOTH_PERIPHERAL permission granted');
            resolve({result: PermissionsRequestResultTypes.GRANTED});
          } else {
            console.log('BLUETOOTH_PERIPHERAL permission not granted');
            resolve({result: PermissionsRequestResultTypes.NOT_GRANTED});
          }
        } else {
          console.warn('BLUETOOTH_PERIPHERAL permissions not required');
          resolve({result: PermissionsRequestResultTypes.GRANTED});
        }
      } else {
        console.info('ACCESS_FINE_LOCATION denied');
        resolve({result: PermissionsRequestResultTypes.NOT_GRANTED});
      }
    } else {
      try {
        if (Platform.Version > 30) {
          console.log('ANDROID VERSION > 30');
          let granted = await requestMultiple([
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
            PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          ]);

          if (
            granted['android.permission.ACCESS_FINE_LOCATION'] ===
              RESULTS.GRANTED &&
            granted['android.permission.BLUETOOTH_CONNECT'] ===
              RESULTS.GRANTED &&
            granted['android.permission.BLUETOOTH_SCAN'] === RESULTS.GRANTED
          ) {
            resolve({result: PermissionsRequestResultTypes.GRANTED});
          }
          resolve({result: PermissionsRequestResultTypes.NOT_GRANTED});
        } else {
          console.info('ANDROID VERSION < 30');
          let granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

          if (granted === RESULTS.GRANTED) {
            console.info('ACCESS_FINE_LOCATION granted');
            resolve({result: PermissionsRequestResultTypes.GRANTED});
          } else {
            console.info('ACCESS_FINE_LOCATION denied');
            resolve({result: PermissionsRequestResultTypes.NOT_GRANTED});
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }

    resolve({result: PermissionsRequestResultTypes.NOT_GRANTED});
  });
}

export default requestPermissions;
