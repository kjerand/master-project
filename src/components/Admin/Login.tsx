import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../../store/admin";
import { RootState } from "../../store/store";
import Card from "../base/Card";
import Container from "../base/Container";
import Header from "../base/Header";
import ROUTES from "../../ROUTES";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = () => {
    if (
      username === process.env.REACT_APP_USERNAME &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      dispatch(setAdmin(true));
    } else {
      setMessage("Wrong credentials.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };
  return (
    <Container>
      <Card width="w-1/3" goBack={() => navigate(ROUTES.menu.path)}>
        <Header title="Login" size="text-2xl" />
        <div className="m-auto mt-10 grid-cols-1 w-1/2 mb-3">
          <div className="w-full">
            <h3 className="font-medium font-mono leading-tight text-base text-gray-700">
              User:
            </h3>
            <input
              type={"text"}
              placeholder="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              className="border-gray-600 border px-2 rounded font-mono w-full mt-1"
              required
              onKeyDown={handleKeyPress}
            />
          </div>
          <h3 className="font-base font-mono leading-tight text-base text-gray-700 mt-2">
            Password:
          </h3>
          <input
            type={"password"}
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="border-gray-600 border px-2 rounded font-mono w-full mt-1"
            required
            onKeyDown={handleKeyPress}
          />
        </div>
        <p
          className={`font-mono text-sm text-center text-red-700 ${
            message === "" && "text-opacity-0"
          }`}
        >
          {message === "" ? "-" : message}
        </p>
      </Card>
    </Container>
  );
};

export default Login;
