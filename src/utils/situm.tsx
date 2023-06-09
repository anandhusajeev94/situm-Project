import SitumPlugin from 'react-native-situm-plugin';

const SITUM_EMAIL = 'ross.ewing@wearetotem.io';
const SITUM_API_KEY =
  '72bd718e0295623801ca7eb15e7fb86ff34d48c846a7f76092b74da3a9eb15b2';

export function initSitumSdk() {
  SitumPlugin.initSitumSDK();
  SitumPlugin.setApiKey(
    SITUM_EMAIL,
    SITUM_API_KEY,
    (response: {success: string}) => {
      console.log(JSON.stringify(response));
      console.log('Authenticated Succesfully: ' + response.success);
    },
  );
  SitumPlugin.setCacheMaxAge(1, (response: {success: string}) => {
    console.log('Cache Age: ' + response.success);
  });
  SitumPlugin.sdkVersions((response: any) => {
    console.log('VERSIONS: ' + JSON.stringify(response));
  });
}
