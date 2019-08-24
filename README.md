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
  ```

  - MongoDB Atlas の URI を取得

    https://www.mongodb.com/cloud/atlas <br>

  - GoogleOAuth からクライアント ID の取得

    https://console.developers.google.com/

    <img width="1169" alt="スクリーンショット 2019-08-24 17 57 57" src="https://user-images.githubusercontent.com/7827576/63635062-0bb1ac00-c699-11e9-833f-298fc5aa8045.png">

* プロジェクトフォルダ直下にて`npm run dev`でサーバ起動

* `client`フォルダ内にて`npm run start`でクライアント起動

## 技術要素

React, Node.js, GraphQL, MongoDB Atlas,

## デモ

https://geopins.redbreakerg.now.sh/login
