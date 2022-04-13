import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { increment, decrement } from "../redux/slice/counterSlice";

const Overview: FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  console.log("rerender");
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(decrement())}>decrement</button>
      <button onClick={() => dispatch(increment())}>increment</button>
    </div>
  );
};

export default Overview;
