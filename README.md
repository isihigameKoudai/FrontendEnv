# FrontendEnv

## 概要
モダンなjsが動作するフロントエンドエンジニア向けの開発環境です。
React.jsやVue.jsなどを任意で導入し、試すことも簡単にできます。
Node.jsが導入されていることが前提なので、Node.jsとパッケージマネージャ(npmまたはyarn)を導入しましょう。

## 使用方法
git cloneしたらディレクトリ内で以下のコマンドを打つと使えます。
```
yarn install
yarn start
```

## 環境構築
### 作業ディレクトリ作成
```
mkdir [workspace-name]
cd [workspace-name]
```

### gitとnpmの初期化
git initでgitリポジトリとして扱えるようになります。
yarn initではそのプロダクトの情報を聞かれ、最終的にはpackage.jsonと呼ばれるディレクトリ内でのパッケージやコマンドを管理するファイルが生成されます。
```
git init
yarn init
```

### gitignoreとeditorconfigの追加
gitignoreは指定したファイルをgitの管理下から除外するためのものです。
editorconfigはいろんなエディタ間でのルール（インデントやタブ・スペースなど）を統一させるファイルです。
```
touch .gitignore
touch .editorconfig
```
.gitignore
```
node_modules/
build/
temp/
.ds_store
```

.editorconfig
```
root = true


[*]

indent_style = tab
indent_size = 2

end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

### ES6とESLintとPrettier
ES6(ECMAscript)と呼ばれる新しいタイプのjavascriptが使えるようにします。
ESLintを使うとコードの一貫性を保つことができたり、潜在的なエラーを見つけ出したりととても便利です。
prettierでコードを自動的に適切な形にフォーマットしてくれます。
ちなみにエディタでprettierとESLintの設定も必要です
```
yarn add --dev eslint eslint-plugin-import eslint-config-airbnb-base prettier eslint-config-prettier eslint-plugin-prettier
```
こちらも追加で導入しましょう。
```
yarn add --dev eslint-config-airbnb eslint-plugin-flowtype eslint-plugin-import eslint-plugin-jsx-a11y
```
.eslintrc.jsのファイルに以下を記述します
```
module.exports = {
    "parser": "babel-eslint",
    "extends": [
      "airbnb",
      "prettier",
      "plugin:flowtype/recommended"
    ],
    "plugins": [
      "prettier"
    ],
    "rules": {
      "prettier/prettier": ["error", {
        "singleQuote": true,
        "bracketSpacing": true,
        "jsxBracketSameLine": true
      }]
    }
  };
```
Lint用のショートカットコマンドをpackage.json内のscriptsに追加します。
```
"lint": "eslint \"src/**/*.js\"",
"lint-fix": "eslint \"src/**/*.js\" --fix",
```

### babelの設定
javacsriptの新しい書き方は、ブラウザによって認識されない場合があるので認識できる形にトランスパイルしてくれる便利屋さんがbabel。
```
yarn add --dev babel babel-core babel-eslint babel-loader babel-preset-env babel-preset-stage2
```

### webpackの設定
webpackは指定したディレクトリ内のリソース（jsファイルやimg,cssなど）をひとまとめにし、実行時に単一ファイルとして書き出してくれる。
webpack-dev-serverで開発用サーバーを立ち上げブラウザすぐに確認することもできる。
```
yarn add --dev webpack webpack-dev-server webpack-cli
```
webpack.config.jsの編集
```
const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    path.resolve('src', 'index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dest/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js','json','jsx'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  devServer: {
    contentBase: 'dest',
  },
};
```

cssやその他ファイルも読めるようにしましょう。
```
yarn add --dev node-sass css-loader sass-loader style-loader url-loader
```
webpack.config.jsのrulesにloaderを追記しましょう。
```
{
  test: /\.(css|sass|scss)$/,
  loader: 'sass-loader',
  options: {
    outputStyle: 'expanded',
    sourceMap: true,
  },
},
{
  test: /\.(jpg|png|json|svg)$/,
  loaders: 'url-loader'
},
```
webpackのショートカットコマンドが使えるようにするため、package.jsonのscriptsに以下のコードを追加します。
```
"test": "echo \"Error: no test specified\" && exit 1",
"build": "webpack --config ./webpack.config.js",
"start": "webpack-dev-server --config ./webpack.config.js --host 0.0.0.0"
```
babel-polyfillのインストール
```
yarn add babel-polyfill
```

### コンテンツの準備
ソース用と公開用ディレクトリの作成
```
mkdir src //ソース用
mkdir dest //公開用
```

src/index.js
```
import 'babel-polyfill'
import foo from './foo.js'

foo();
```

src/foo.js
```
export default function foo() {
    document.getElementById('app').innerHTML = "Hello world";
}
```

dest/index.html
```
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>Frontend Env App</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/bundle.js"></script>
  </body>
</html>
```

### webpackの起動
以下、コマンドでブラウザ内でhttp://localhost:8080/にアクセスしてみて、Hello worldのメッセージが出れば完成です。
```
yarn start
```

### 参考URL
https://github.com/masakitm/vue-nocli  
https://github.com/nabepon/frontend/tree/env-setup-tutorial  
https://ics.media/entry/12140  
https://www.kken.io/posts/prettier-eslint/  

上記の記事を参考にさせていただきました。ありがとうございます！
