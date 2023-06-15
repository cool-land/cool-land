import type { Dispatch, ErrorInfo, FC, ReactNode, SetStateAction } from "react";
import { Component, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface PropsType {
  children: ReactNode;
  hasError: boolean;
  ErrorComponent?: FC<StateType>;
  setHasError: Dispatch<SetStateAction<boolean>>;
}

interface StateType {
  hasError: boolean;
  error: null | Error;
  errorInfo: null | ErrorInfo;
}

class ErrorBoundaryInner extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  componentDidUpdate(prevProps: PropsType) {
    if (!this.props.hasError && prevProps.hasError) {
      this.setState({ hasError: false });
    }
  }

  // 捕获抛出异常
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.setHasError(true);
    // 传递异常信息
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    // 如果捕获到异常，渲染降级UI
    if (this.state.hasError) {
      return (
        this.props.ErrorComponent?.(this.state) || (
          <div>
            <h1>{`Error:${this.state.error?.message}`}</h1>
            <details style={{ whiteSpace: "pre-wrap" }}>
              {this.state.errorInfo?.componentStack}
            </details>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

const ErrorBoundary: FC<any> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [location.key]);
  return (
    <ErrorBoundaryInner hasError={hasError} setHasError={setHasError}>
      {children}
    </ErrorBoundaryInner>
  );
};

export default ErrorBoundary;
