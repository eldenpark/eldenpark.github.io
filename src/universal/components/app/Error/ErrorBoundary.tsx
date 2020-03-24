/* eslint-disable react/prefer-stateless-function */
import { logger } from 'jege';
import React from 'react';

const log = logger('[sandbox-web]');

class ErrorBoundary extends React.Component {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error, info): void {
    log('ErrorBoundary(): error: %o, info: %o', error, info);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

interface State {
  hasError: boolean;
}
