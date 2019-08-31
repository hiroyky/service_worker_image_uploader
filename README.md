# Serviceworker Image Uploader

## 概要

Service workerのサンプルプログラムです．

画像をアップロードする際に，Service workerが画像を縮小してからアップロードします．
Service workerのfetchイベントで縮小処理を行っています．


## はじめかた

node.js及びyarnの環境があることが前提です．

```
$ yarn install
$ yarn build
$ yarn start
```

ウェブブラウザで``http://localhost:3000``にアクセスしてください．
Service workerの都合上プライベートウィンドウで開くことをお勧めします．

Webのフォームから画像をアップロードすると，縦もしくは横が200px以下に縮小された画像が``./upload_files``に保存されます．

## 構成

```
./src/server/index.ts: サーバ側プログラムの開始地点. nodex.js, express
./src/client/indexts: ウェブブラウザで動作するスクリプトの開始地点
./src/serviceworker/index.ts: サービスワーカのプログラム
```
