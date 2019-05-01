const { AuthenticationError } = require("apollo-server");
const Pin = require("./models/Pin");

// if don't have a current user, throw an error.
// Meaning the login was unsuccessful.
// GraphQL.jsスキーマの全てのresolverは以下の４つの引数を持っている
// fieldName(obj, args, context, info) { result }
const authenticated = next => (root, args, ctx, info) => {
  // コンテキストはすべてのリゾルバに渡される3番目の引数です。
  // 認証スコープ、データベース接続、カスタムフェッチ機能など、あらゆるリゾルバが必要とするものを渡すのに役立ちます。
  // さらに、データローダーを使用してリゾルバー間でリクエストをバッチ処理する場合は、それらをコンテキストに添付することもできます。
  // ※currentUserはどこから来たの？
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  // リゾルバーは、GraphQL操作（クエリ、変換、または購読）をデータに変換するための指示を提供します。
  // それらはスキーマで指定したのと同じタイプのデータを返すか、そのデータに対するPromiseを返します
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser)
  },
  Mutation: {
    createPin: authenticated(async (root, args, ctx) => {
      const newPin = await new Pin({
        ...args.input,
        author: ctx.currentUser._id
      }).save();
      const pinAdded = await Pin.populate(newPin, "author");
      return pinAdded;
    })
  }
};
