import { Link } from "react-router-dom";
import { ErrorBoundary as BaseErrorBoundary } from "react-error-boundary";

export default function ErrorBoundary() {
  return (
    <BaseErrorBoundary fallback={<h4>There is an error in a component</h4>}>
      <h1>Welcome to our website...</h1>
      <p>
        Please check our <Link to="/counter">counter app</Link>
      </p>
      <p>
        You can also check out our 404 page by clicking on this link that
        directs you to an invalid path 404 Page
      </p>

      <Link to="/">Go back to home</Link>
    </BaseErrorBoundary>
  );
}
