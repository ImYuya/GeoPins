const { AuthenticationError, PubSub } = require("apollo-server");
const Pin = require("./models/Pin");

const pubsub = new PubSub();
const PIN_ADDED = "PIN_ADDED";
const PIN_DELETED = "PIN_DELETED";
const PIN_UPDATED = "PIN_UPDATED";

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
    me: authenticated((root, args, ctx) => ctx.currentUser),
    getPins: async (root, args, ctx) => {
      const pins = await Pin.find({})
        .populate("author")
        .populate("comments.author");
      return pins;
    }
  },
  Mutation: {
    createPin: authenticated(async (root, args, ctx) => {
      const newPin = await new Pin({
        ...args.input,
        author: ctx.currentUser._id
      }).save();
      const pinAdded = await Pin.populate(newPin, "author");
      pubsub.publish(PIN_ADDED, { pinAdded });
      return pinAdded;
    }),
    deletePin: authenticated(async (root, args, ctx) => {
      const pinDeleted = await Pin.findOneAndDelete({ _id: args.pinId }).exec();
      pubsub.publish(PIN_DELETED, { pinDeleted });
      return pinDeleted;
    }),
    createComment: authenticated(async (root, args, ctx) => {
      const newComment = { text: args.text, author: ctx.currentUser._id };
      const pinUpdated = await Pin.findOneAndUpdate(
        { _id: args.pinId },
        { $push: { comments: newComment } },
        { new: true }
      )
        .populate("author")
        .populate("comments.author");
      pubsub.publish(PIN_UPDATED, { pinUpdated });
      return pinUpdated;
    })
  },
  Subscription: {
    pinAdded: {
      subscribe: () => pubsub.asyncIterator(PIN_ADDED)
    },
    pinDeleted: {
      subscribe: () => pubsub.asyncIterator(PIN_DELETED)
    },
    pinUpdated: {
      subscribe: () => pubsub.asyncIterator(PIN_UPDATED)
    }
  }
};
