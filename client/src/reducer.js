// reducerの作成
export default function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_USER":
      // {...state, ***}にすることで
      // 戻り値を元のstateに***を足すことができる？
      // つまりLOGIN_USERによってcurrentUserを足す。
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
}
