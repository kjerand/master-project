import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdmin, setUserID } from "../../store/admin";
import { RootState } from "../../store/store";
import Card from "../base/Card";
import Container from "../base/Container";
import Header from "../base/Header";
import ROUTES from "../../ROUTES";
import { validID } from "../../utils/userID";
import Button from "../base/Button";

const UserLogin = () => {
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch();

  const login = () => {
    if (validID.includes(password)) {
      dispatch(setUserID(password));
    } else {
      setMessage("Invalid user ID.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };
  return (
    <Container>
      <Card width="w-1/3">
        <Header title="Login" size="text-2xl" />
        <div className="m-auto mt-10 grid-cols-1 w-1/2 mb-3">
          <h3 className="font-base font-mono leading-tight text-base text-gray-700 mt-2">
            User ID:
          </h3>
          <input
            type={"text"}
            placeholder="User ID"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="border-gray-600 border px-2 rounded font-mono w-full mt-1"
            required
            onKeyDown={handleKeyPress}
          />
          <Button
            text={"Login"}
            onClick={login}
            className={`bg-[#00509e] hover:bg-blue-700 w-full mt-4`}
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

export default UserLogin;
