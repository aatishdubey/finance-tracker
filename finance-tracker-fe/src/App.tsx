import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Pages } from './pages';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/config';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
