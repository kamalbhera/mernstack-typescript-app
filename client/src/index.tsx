import ReactDom from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import 'src/styles/index.scss';

import { MultiLanguageProvider } from './context/MultiLanguageProvider';
import { UserProvider } from './context/UserProvider';
import Routing from './routes';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <UserProvider>
            <MultiLanguageProvider>
              <Routing />
            </MultiLanguageProvider>
          </UserProvider>
        </ToastProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
