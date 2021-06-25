import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert"
class ErrorBoundary extends Component {
    state = {
        error: null,
        errorInfo: null,
    }

    componentDidCatch(error, errorInfo) {
        this.setState(error, errorInfo);
    }

    render() {
        const { errorInfo } = this.state;
        if (errorInfo) {
            return <Alert severity="error">Error Rendering the Component</Alert>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;