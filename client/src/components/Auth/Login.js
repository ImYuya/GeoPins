import React, { useContext } from "react";
import { GraphQLClient } from "graphql-request";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

import Context from "../../context";

const ME_QUERY = `
{
  me {
    _id
    name
    email
    picture
  }
}
`;

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  // ログインが成功した時の処理
  const onSuccess = async googleUser => {
    // GoogleLoginのレスポンスからid_tokenの取得
    const idToken = googleUser.getAuthResponse().id_token;
    // id_tokenを使い、GraphQLClientインスタンスの作成
    const client = new GraphQLClient("http://localhost:4000/graphql", {
      headers: {
        authorization: idToken
      }
    });
    // GraphGLClientのrequestメソッドから"http://localhost:4000/graphql"上で
    // 実行されたクエリのレスポンスをdataに格納
    const data = await client.request(ME_QUERY);
    // console.log({data});
    // ディスパッチ、payloadにはログインするユーザの情報を渡す。
    dispatch({ type: "LOGIN_USER", payload: data.me });
  };

  return (
    <GoogleLogin
      clientId="691380655626-afl8s0p45p9lbj9jvadl24t2ugku3o6k.apps.googleusercontent.com"
      onSuccess={onSuccess}
      buttonText="Login"
      isSignedIn={true}
    />
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
