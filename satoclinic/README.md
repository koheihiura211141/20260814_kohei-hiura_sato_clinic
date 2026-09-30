# 佐藤医院 Webサイト制作課題

職業訓練の学習用に制作している架空の病院Webサイトです。

## ディレクトリ構成

```text
satoclinic/
├─ index.html                 # GitHub Pages公開用トップページ
├─ assets/
│  ├─ css/
│  │  └─ style.css            # サイトのスタイル
│  ├─ js/
│  │  └─ script.js            # 将来用。現時点では未使用
│  └─ images/                 # 支給画像・アイコン
├─ docs/
│  ├─ requirements.md         # 制作要件
│  ├─ specification.md        # 掲載情報・仕様
│  └─ design-system.md        # 色・文字・デザインルール
├─ AGENTS.md                  # Codex / ChatGPT向け作業ルール
├─ README.md
└─ .gitignore
```

## AIで修正するとき

Codex / ChatGPTには、修正前に以下を読ませる。

1. `AGENTS.md`
2. `docs/requirements.md`
3. `docs/specification.md`
4. `docs/design-system.md`

その後、変更箇所を具体的に指定する。

例：

```text
作業前にAGENTS.mdとdocs内のMarkdownをすべて確認してください。
既存デザインを維持し、今回指定した箇所以外は変更しないでください。

今回の修正：
○○セクションの○○だけを変更してください。
```

## 現在の状態

- PC版：1440px基準
- レスポンシブ：未対応（後工程で実施予定）
- JavaScript：現時点では未使用
- `noindex, nofollow`：設定済み
- 学習用架空サイトの断り書き：フッターに設定済み

## ローカル確認

`index.html` をブラウザで開いて確認できる。

ローカルサーバーを使用する場合は、リポジトリのルートをドキュメントルートとして起動する。

## GitHub Pages

GitHub Pagesでは、リポジトリのルート直下にある `index.html` を公開対象にする。

CSS・画像はすべて相対パスで参照しているため、ディレクトリ構成を保ったままpushする。

## 注意

このサイトは学習用の架空サイトです。掲載されている医院・人物・所在地・連絡先は実在のものではありません。
