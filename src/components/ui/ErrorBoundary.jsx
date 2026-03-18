import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-bg-base px-8 text-center text-text-primary">
          <div className="mb-4 text-5xl">!</div>
          <h2 className="mb-2 font-display text-2xl font-extrabold">Something went wrong</h2>
          <p className="mb-6 max-w-[400px] text-text-secondary">
            {this.state.error?.message || 'An unexpected error occurred. Please try again.'}
          </p>
          <button
            onClick={this.handleReset}
            className="rounded-xl bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent-hover hover:shadow-accent"
          >
            Go Home
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
