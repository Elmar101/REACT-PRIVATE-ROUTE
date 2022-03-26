import {
  Routes,
  Route,
  BrowserRouter,
  Link,
  Navigate,
  Outlet
} from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <MyMenu />
      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/private-outlet" element={<PrivateOutlet />}>
          <Route path="" element={<Private />} />
          <Route path="az" element={<PrivateAz />} />
        </Route>
        <Route
          path="/private-nested"
          element={
            <PrivateRoute>
              <Private />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

const Public = () => <div>public</div>;
const Private = () => <div>private</div>;
const PrivateAz = () => <div>private Az</div>;
const Login = () => <div>login</div>;

function PrivateOutlet() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}

function useAuth() {
  return true;
}

function MyMenu() {
  return (
    <nav>
      <Link to="/">Public</Link>
      {" | "}
      <Link to="/private-nested">Private Using Nested</Link>
      {" | "}
      <Link to="/private-outlet">Private Using Outlet</Link>
      {" | "}
      <Link to="/private-outlet/az">Private Using Outlet Az</Link>
    </nav>
  );
}
