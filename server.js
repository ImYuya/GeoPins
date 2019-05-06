const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { findOrCreateUser } = require("./controllers/userController");

// DB connect
// DB connectできない時はMongoAtlasのclusterのSecurityにおいてIP Whitelistを疑う
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("DB connected!"))
  .catch(err => console.log(err));

const server = new ApolloServer({
  // スキーマ定義
  typeDefs,
  // スキーマと実際のデータソースをマッピング定義
  resolvers,
  // contextはあらゆるレベルで全てのリゾルバに渡されるので、
  // スキーマコード内のどこにでもアクセスできます。
  // データフェッチャー、データベース接続、要求を出したユーザーに関する情報などを格納できる場所です。
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      // authTokenはクライアントからサーバへのユーザー情報リクエストの内容
      // 具体的には、Login.jsのGraphQLClientインスタンス作成時に
      // headers.autherizationとしてid_tokenが渡される。
      authToken = req.headers.authorization;
      if (authToken) {
        // find or create user
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (err) {
      console.log(`Unable to quthenticate user with token ${authToken}`);
    }
    return { currentUser };
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
