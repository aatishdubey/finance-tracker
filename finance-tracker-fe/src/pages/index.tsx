import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Login } from './Login';
import { Dashboard } from './Home';
import { NotFoundPage } from './NotFound';
import { useIsAuthenticated } from '../state/user';
import { Logout } from './Logout';
import { PageLayout } from '../components/Layout';
import { Earnings } from './Earnings';
import { Expenses } from './Expenses';
import { Savings } from './Savings';
import { Investments } from './Investments';

export function Pages() {
  return (
    <>
      <PageLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/"
            element={
              <EnsureAuthenticated>
                <Dashboard />
              </EnsureAuthenticated>
            }
          />
          <Route
            path="/earnings"
            element={
              <EnsureAuthenticated>
                <Earnings />
              </EnsureAuthenticated>
            }
          />
          <Route
            path="/expenses"
            element={
              <EnsureAuthenticated>
                <Expenses />
              </EnsureAuthenticated>
            }
          />
          <Route
            path="/savings"
            element={
              <EnsureAuthenticated>
                <Savings />
              </EnsureAuthenticated>
            }
          />
          <Route
            path="/investments"
            element={
              <EnsureAuthenticated>
                <Investments />
              </EnsureAuthenticated>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageLayout>
    </>
  );
}

function EnsureAuthenticated({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement {
  const isAuthenticated = useIsAuthenticated();
  const { pathname } = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={`/login?from=${pathname}`} />;
  }

  return children;
}
