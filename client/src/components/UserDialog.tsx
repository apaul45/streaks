import { User } from "../types";
import { DAILY_AMT, determineDays } from "../utils";

interface Props {
  user: User;
  updateUser: Function;
}

const UserDialog = ({ user, updateUser }: Props) => {
  const enabledStyle =
    "text-white block bg-blue-700 hover:bg-blue-800 active:border-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
  const disabledStyle = "text-white block bg-gray-400 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 focus:outline-none";

  const disableButton = determineDays(user.lastSignIn) != 1;

  return (
    <div className="flex flex-col items-center outline mt-36 mx-auto py-9 w-4/12 h-4/6 gap-9">
      <h1 className=" text-4xl"> Welcome {user.username}! </h1>

      <div className="flex flex-col gap-2 items-center">
        <h6>You currently have</h6>
        <div className="font-bold text-5xl"> {user.coins} </div>
      </div>

      <button
        type="button"
        className={disableButton ? disabledStyle : enabledStyle}
        onClick={() => updateUser({ coins: user.coins + DAILY_AMT })}
        disabled={disableButton}
      >
        Get Coins
      </button>
    </div>
  );
};

export default UserDialog;
