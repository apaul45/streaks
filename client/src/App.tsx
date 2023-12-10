import { useState } from "react";
import "./App.css";
import { login, register, update } from "./api";
import { User } from "./types";
import { NavigationBar, PopupDialog, UserDialog } from "./components";
import { BONUS, DAYS_FOR_BONUS, determineDays } from "./utils";

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleRegister = async (username: string, password: string) => {
    const res = await register({ username, password });
    setUser(res.data);
  };

  const handleLogin = async (username: string, password: string) => {
    const res = await login({ username, password });
    let signedInUser = res.data;

    const days = determineDays(signedInUser?.lastSignIn as string);

    if (days >= 1) {
      // @ts-ignore
      signedInUser.streak = days == 1 ? user.streak + 1 : 0;

      const reachedBonus = signedInUser.streak > 0 && signedInUser.streak % DAYS_FOR_BONUS == 0;
      signedInUser.coins += reachedBonus ? BONUS : 0;

      await update(signedInUser?.username as string, { ...signedInUser });
    }

    setUser(signedInUser);
  };

  const handleUpdate = async (changes: any) => {
    const res = await update(user?.username as string, changes);

    if (res.status == 200) setUser({ ...user, ...changes } as User);
  };

  return (
    <div className="h-screen">
      <NavigationBar
        user={user}
        handleLogin={(username: string, password: string) => handleLogin(username, password)}
        handleRegister={(username: string, password: string) => handleRegister(username, password)}
      />
      <br />

      {user && <UserDialog user={user} updateUser={(changes: any) => handleUpdate(changes)} />}
    </div>
  );
}

export default App;
