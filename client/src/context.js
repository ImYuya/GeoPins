import { createContext } from "react";

// contextのインスタンス作成
const Context = createContext({
  // 初期状態はcurrentUserをnullにする
  currentUser: null
});

export default Context;
