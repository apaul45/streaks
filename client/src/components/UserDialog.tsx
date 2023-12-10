import { User } from "../types";
import { DAILY_AMT, determineDays } from "../utils";

interface Props {
  user: User | null;
  updateUser: Function;
  handleLogin: Function;
  handleRegister: Function;
}

const UserDialog = ({ user, updateUser, handleLogin, handleRegister }: Props) => {
  const enabledStyle = "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  const disabledStyle = "bg-gray-400";

  const disableButton = user && determineDays(user.lastSignIn) != 1;

  return (
    <div className="flex flex-col items-center justify-center outline outline-8 mx-auto py-9 w-3/12 h-4/6 gap-9 rounded-3xl bg-white">
      {!user && (
        <>
          <button
            type="button"
            className="text-white block active:border-none font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 focus:outline-none bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleRegister("apaul", "hi")}
          >
            Register
          </button>

          <button
            type="button"
            className="text-white block active:border-none font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 focus:outline-none bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleLogin("apaul", "hi")}
          >
            Login
          </button>
        </>
      )}

      {user && (
        <>
          <h1 className="text-4xl"> Welcome {user.username}! </h1>

          <div className="flex flex-col gap-2 items-center">
            <h6>You currently have</h6>
            <div className="font-bold text-5xl"> {user.coins} </div>
          </div>

          <button
            type="button"
            className={
              "text-white block active:border-none font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 focus:outline-none " +
              (disableButton ? disabledStyle : enabledStyle)
            }
            // Update lastSignIn on Get Coins click so they can click it once, but not again
            onClick={() => updateUser({ coins: user.coins + DAILY_AMT, lastSignIn: new Date() })}
            disabled={disableButton || false}
          >
            Get Coins
          </button>
        </>
      )}
    </div>
  );
};

export default UserDialog;
