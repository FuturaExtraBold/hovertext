import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#111",
            color: "#fff",
            fontFamily: "system-ui, sans-serif",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: "16px", color: "#888", marginBottom: "24px" }}>
            An unexpected error occurred. Please try reloading the page.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#fff",
              color: "#111",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
