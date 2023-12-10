import { User } from "../types";

interface Props {
  user: User | null;
  handleLogin: Function;
  handleRegister: Function;
}

export const NavigationBar = ({ user, handleLogin, handleRegister }: Props) => {
  return (
    <nav className="font-semibold text-lg mx-6">
      <ul className="flex float-right">
        {!user && (
          <>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
              <button onClick={() => handleRegister("apaul", "hi")}>Register</button>
            </li>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
              <button onClick={() => handleLogin("apaul", "hi")}>Login</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
