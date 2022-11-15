import * as path from 'node:path';
import * as webpack from 'webpack';

// The webpack configuration
const configs: webpack.Configuration[] = [
    {
        mode: 'development',
        devtool: 'inline-source-map',
        entry: './src/index.tsx',
        target: 'node',

        output: {
            path: path.resolve('build'),
            filename: 'index.bundle.js'
        },

        module: {
            rules: [
                {
                    test: /\.[tj]sx?/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-react',
                                    '@babel/preset-typescript'
                                ]
                            }
                        }
                    ]
                }
            ]
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js', '...']
        }
    },
    {
        mode: 'development',
        devtool: 'inline-source-map',
        entry: './src/client/index.tsx',
        target: 'web',

        output: {
            path: path.resolve('static'),
            filename: 'index.bundle.js'
        },

        module: {
            rules: [
                {
                    test: /\.[tj]sx?/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-react',
                                    '@babel/preset-typescript'
                                ]
                            }
                        }
                    ]
                }
            ]
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js', '...']
        }
    }
];

// Webpack compiler
const compiler: webpack.MultiCompiler = webpack(configs);

// Watch for changes in the configuration
compiler.watch({
    poll: 100,
    ignored: /node_modules/,
}, function (err, stats) {
    // Error handling and logging.
    if (err) {
        console.error(err.stack || err);
    }

    // Compile the bundle with the given configuration
    if (stats) {
        console.log(stats.toString({
            colors: true
        }));
    }
});