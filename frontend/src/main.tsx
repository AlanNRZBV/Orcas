import React from 'react'
import ReactDOM from 'react-dom/client'
import {persistor, store} from "./app/store.ts";
import {router} from "./router/router.tsx";
import {addInterceptors} from "./axiosApi.ts";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./constants.ts";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme.ts";


addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(

    <React.StrictMode>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={theme}>
              <CssBaseline/>
            <Provider store={store}>
              <RouterProvider router={router} />
            </Provider>
            </ThemeProvider>
          </PersistGate>
      </GoogleOAuthProvider>
    </React.StrictMode>,
)
