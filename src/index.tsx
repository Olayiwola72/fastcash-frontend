import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './pages/Layout';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor} from './redux/store';
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from '@react-oauth/google';
import PreLoader from './components/PreLoader';
import { HelmetProvider } from 'react-helmet-async';
import { NavigateProvider } from './components/NavigateProvider';
import { GOOGLE_CLIENT_ID } from './constants/env';
import './utils/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID as string}>
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <NavigateProvider>
                  <PersistGate loading={<PreLoader isLoading={true}/>} persistor={persistor}>
                    <HelmetProvider>
                      <Suspense fallback={<PreLoader isLoading={true} />}>
                        <Layout /> 
                      </Suspense>
                    </HelmetProvider>           
                  </PersistGate>
                </NavigateProvider>
            </BrowserRouter>
          </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
