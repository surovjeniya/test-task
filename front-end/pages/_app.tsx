import "../app/styles/global.scss";
import type { AppProps } from "next/app";
import { store, persistor } from "../app/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { TypeComponentAuthFileds } from "providers/private-route.interface";
import AuthProvider from "providers/auth.provider";
import ReduxToastr from "react-redux-toastr";

type TypeAppProps = AppProps & TypeComponentAuthFileds;

export default function App({ Component, pageProps }: TypeAppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AuthProvider Component={Component}>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-left"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
          <Component {...pageProps} />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
