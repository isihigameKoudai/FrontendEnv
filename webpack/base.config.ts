import * as path from 'path';
import { Configuration } from 'webpack';
import * as glob from 'glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

const BUILD_ROOT: string = path.join(__dirname, "../dist");
const SRC_ROOT: string = path.join(__dirname, "../src");
const manifest = require('../manifest.json');

const getEntries = (srcDir = './src') => {
  const entries = {};
  glob.sync(`*.ts`, {
    ignore: '**/_*.ts',
    cwd: srcDir
  }).map(key => {
    const entryName: string = key.substr(0, key.indexOf('.'));
    entries[entryName] = path.resolve(srcDir, key);
  });

  return entries;
};

export const config: Configuration = {
  context: SRC_ROOT,
  entry: getEntries(),
  output: {
    filename: '[name].js',
    path: BUILD_ROOT
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          { loader: 'thread-loader' },
          {
            loader: 'ts-loader',
            options: {
                happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [{
          loader: 'style-loader'
        },{
          loader: 'css-loader'
        },{
          loader: 'sass-loader',
          options: {
            outputStyle: "expanded",
            sourceMap: true
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)(\?.+)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 4096,
            name: '[path][name].[ext]'
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: [SRC_ROOT, 'node_modules'],
    alias: {
      "@": SRC_ROOT + '/'
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name ( module, chunks, cacheGroupKey ) {
        const moduleFileName = module.identifier().split('/').reduceRight(item => item);
        const allChunksNames = chunks.map((item) => item.name).join('~');
        return `${cacheGroupKey}-${allChunksNames}`;
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: manifest.name || 'FrontEndEnv',
      template: SRC_ROOT + '/assets/template/index.html.ejs',
      meta: {
        viewport: "width=device-width, initial-scale=1",
        description: manifest.description,
        'og:title': manifest.name,
        'og:type': 'website',
        'og:image': '',
        'og:image:alt': '',
        'og:url': '',
        'og:locale': 'ja_JP',
        'twitter:card': 'summary_large_image',
        'twitter:title': manifest.name,
        'twitter:description': manifest.description,
        'twitter:image': ''
      }
    })
  ]
};
