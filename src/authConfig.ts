import { LogLevel, PublicClientApplication } from '@azure/msal-browser';

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: '11c96f8e-cc66-48bf-a21b-4f49643a04f9',
    authority: 'https://login.microsoftonline.com/0213c7bf-21e1-4cb4-8529-e4eaff767ca4',
    redirectUri: 'https://redirecturiblank.z1.web.core.windows.net/blank.html', // Must be registered as a SPA redirectURI on your app registration
    postLogoutRedirectUri: '/' // Must be registered as a SPA redirectURI on your app registration
  },
  cache: {
    cacheLocation: 'localStorage'
  },
  system: {
      loggerOptions: {
          loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
              if (containsPii) {
                  return;
              }
              switch (level) {
                  case LogLevel.Error:
                      console.error(message);
                      return;
                  case LogLevel.Info:
                      console.info(message);
                      return;
                  case LogLevel.Verbose:
                      console.debug(message);
                      return;
                  case LogLevel.Warning:
                      console.warn(message);
                      return;
                  default:
                      return;
              }
          },
          logLevel: LogLevel.Verbose
      },
      // pollIntervalMilliseconds: 20,
      // asyncPopups: true,
      // windowHashTimeout: 9000, // Applies just to popup calls - In milliseconds
      // iframeHashTimeout: 9000, // Applies just to silent calls - In milliseconds
      // loadFrameTimeout: 9000 // Applies to both silent and popup calls - In milliseconds
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);

// Popup API for mobile
window.onload = () => {
    
  const urlParams = new URLSearchParams(window.location.search);
  const sid = urlParams.get("sid");

  console.log("sid: " + sid);

  // attempt SSO
  msalInstance.ssoSilent({
      sid: sid!,
      scopes: loginRequest.scopes,
      redirectUri: "https://redirecturiblank.z1.web.core.windows.net/blank.html",
  }).then((response) => {
      // do something with response
      console.log("ssoSilent: \n" + JSON.stringify(response))
  }).catch(error => {
      // handle errors
      console.error("ssoSilent: " + error.errorCode)
  });
}

//END

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ['User.Read'],
  redirectUri: "https://redirecturiblank.z1.web.core.windows.net/blank.html"
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
