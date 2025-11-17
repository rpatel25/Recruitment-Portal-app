import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Screening } from "@/components/Assessment/Screening";

export default function Page() {
  return (
    <Provider store={store}>
      <Screening />
    </Provider>
  );
}
