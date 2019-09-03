# アプリ概要

地図上にピンを置いて、ピンにタイトルや内容・写真を付加し共有する Web アプリ

## UI

<table style="border-style: none;"><tr>
  <td style="border-style: none;">
   <img width="647" alt="スクリーンショット 2019-08-21 7 15 09" src="https://user-images.githubusercontent.com/7827576/63598708-17e72c00-c5fb-11e9-9635-06e3f6451e7f.png">
  </td>
  <td style="border-style: none;">
   <img width="1063" alt="スクリーンショット 2019-08-21 7 14 22" src="https://user-images.githubusercontent.com/7827576/63598687-0a31a680-c5fb-11e9-80ef-5465c9657b21.png">
  </td>
  <td style="border-style: none;">
   <img width="926" alt="スクリーンショット 2019-08-21 7 13 13" src="https://user-images.githubusercontent.com/7827576/63596362-0baca000-c5f6-11e9-8d69-f440604e93d7.png">
  </td>
</table>

## 使い方

- パッケージダウンロード

  ```
  git clone https://github.com/ImYuya/GeoPins.git
  cd GioPins
  npm install
  ```

- プロジェクトフォルダ直下にて`.env`ファイルの作成

  ```
  MONGO_URI = mongodb+srv://XXXXXXXXXX:xxxxxxxxxxxxxxxxxxxxxxxxxxxx-euuzm.mongodb.net/test?retryWrites=true
  OAUTH_CLIENT_ID = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
  HEROKU_URL = wss://geopins1.herokuapp.com/graphql
  ```

  - MongoDB Atlas の URI を取得

    https://www.mongodb.com/cloud/atlas <br>

    <img width="665" alt="スクリーンショット 2019-09-03 7 09 47" src="https://user-images.githubusercontent.com/7827576/64172157-497bb500-ce8f-11e9-96dc-b84f1752c3db.png">

  * GoogleOAuth からクライアント ID の取得

    https://console.developers.google.com/ <br>

    <img width="1169" alt="スクリーンショット 2019-08-24 17 57 57" src="https://user-images.githubusercontent.com/7827576/63635062-0bb1ac00-c699-11e9-833f-298fc5aa8045.png">

- `client`フォルダ内`.env`ファイルにて

  下記において xxxx の箇所を Mapbox および Cloudinary から取得して記入

  ```
   REACT_APP_MAPSTYLE = mapbox://styles/mapbox/xxxxxxxxxxxxxxxxxx
   REACT_APP_MAPBOXAPIACCESSTOKEN = pk.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   REACT_APP_CLOUDINARY = https://api.cloudinary.com/v1_1/xxxxxxxxxxx/image/upload
  ```

  - Mapbox の Style Api および mapboxApiAccessToken を取得

    https://account.mapbox.com <br>


    <table style="border-style: none;"><tr>
      <td style="border-style: none;">
        <img width="997" alt="スクリーンショット 2019-09-03 7 13 33" src="https://user-images.githubusercontent.com/7827576/64172879-e25f0000-ce90-11e9-90ac-9e31a51227c8.png">
      </td>
      <td style="border-style: none;">
         <img width="1139" alt="スクリーンショット 2019-09-03 7 11 55" src="https://user-images.githubusercontent.com/7827576/64172680-7f6d6900-ce90-11e9-9826-5479e0745d11.png">
      </td>
    </table>

- Cloudinary から アップロードの Api 取得

  https://cloudinary.com/ <br>

  <img width="905" alt="スクリーンショット 2019-09-03 7 15 17" src="https://user-images.githubusercontent.com/7827576/64173186-ab3d1e80-ce91-11e9-9bf8-141e30c791f0.png">

* プロジェクトフォルダ直下にて`npm run dev`でサーバ起動

* `client`フォルダ内にて`npm run start`でクライアント起動

## 技術要素

- フロントエンド：React(hooks 利用), ApolloClient(GraphQL)
- サーバサイド：Node.js, ApolloServer(GraphQL)
- データベース：MongoDB Atlas(mongoos)
- 画像ストレージ：Cloudinary
- 地図データ：Mapbox

## アーキテクチャ

## デモ

https://geopins.redbreakerg.now.sh/login
