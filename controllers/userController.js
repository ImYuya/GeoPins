const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

// リクエストを受けたauthTokenから登録されているユーザかどうか判断し、
// 登録されていなければユーザ登録する
exports.findOrCreateUser = async token => {
  // verify auth token　トークンの検証
  const googleUser = await verifiyAuthToken(token);
  // check if th user exists　ユーザの存在確認
  const user = await checkIfUserExists(googleUser.email);
  // if user exists, return them; otherwise, create new user in db　存在なければユーザ登録
  return user ? user : createNewUser(googleUser);
};

const verifiyAuthToken = async token => {
  try {
    // OAuth2ClientのverifyIdTokenメソッドを使ってトークンの検証
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    });
    // ticketのペイロード(ユーザ情報：名前、メール、写真など）を取得
    return ticket.getPayload();
  } catch (err) {
    console.log("Error verifying auth token", err);
  }
};

// mongoose.modelのfindOneメソッド（コールバック）で名前検索、戻り値：Promise
const checkIfUserExists = async email => await User.findOne({ email }).exec();

// 新規ユーザ登録
const createNewUser = googleUser => {
  const { name, email, picture } = googleUser;
  const user = { name, email, picture };
  // User.jsにてmongoose.modelのsaveメソッドにて
  // DBへのuserの書込み（インスタンス作成）
  return new User(user).save();
};
