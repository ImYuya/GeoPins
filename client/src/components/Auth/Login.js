import React, { useContext } from "react";
import { GraphQLClient } from "graphql-request";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Context from "../../context";
import { ME_QUERY } from "../../graphql/queries";

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  // ログインが成功した時の処理
  // googleUserにはGoogleLoginのメソッドが継承される
  const onSuccess = async googleUser => {
    try {
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
      const { me } = await client.request(ME_QUERY);
      console.log({ me });

      // ディスパッチ（アクションをリデューサへ渡す）、payloadにはログインするユーザの情報を渡す。
      dispatch({ type: "LOGIN_USER", payload: me });
      // ログイン中であればgoogleUser.isSignedIn()はtrueを返す。
      dispatch({
        type: "IS_LOGGED_IN",
        payload: googleUser.isSignedIn()
      });
    } catch (err) {
      onFailure(err);
    }
  };

  const onFailure = err => {
    console.log("Error logging in", err);
  };

  return (
    // classes.rootはセンターに持ってくるためのもの
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: "rgb(66, 133, 244)" }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        buttonText="Login With Google"
        theme="dark"
      />
    </div>
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
