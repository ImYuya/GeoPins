// reducerの作成
export default function reducer(state, { type, payload }) {
  switch (type) {
    case "LOGIN_USER":
      // {...state, ***}にすることで
      // 戻り値を元のstateに***を足すことができる？
      // つまりLOGIN_USERによってcurrentUserを足す。
      return {
        ...state,
        currentUser: payload
      };
    case "IS_LOGGED_IN":
      return {
        ...state,
        isAuth: payload
      };
    default:
      return state;
  }
}
