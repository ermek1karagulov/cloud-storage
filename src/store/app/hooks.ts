import { useAppSelector } from "..";

export const useAppLoader = () => useAppSelector((state) => state.app.loader);
