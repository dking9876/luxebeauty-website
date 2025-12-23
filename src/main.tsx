import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
// import './debug_imports'

console.log('Main.tsx executing - Production Mode Fixed');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found');
  } else {
    console.log('Root element found, mounting Full App');
    createRoot(rootElement).render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    )
    console.log('Full App render called');
  }
} catch (err) {
  console.error('Error during render:', err);
}
