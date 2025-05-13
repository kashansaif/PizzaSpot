import { useDispatch, useSelector } from "react-redux";
import { appDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<appDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
