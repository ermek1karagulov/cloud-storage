import { useAppSelector } from "..";

export const useIsAuth = () => useAppSelector((state) => state.user.isAuth);
export const useCurrentUser = () =>
  useAppSelector((state) => state.user.currentUser);
