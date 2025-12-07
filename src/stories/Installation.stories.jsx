export default {
    title: "Installation",
    parameters: {
        previewTabs: {
            canvas: { hidden: true },
        },
        viewMode: "docs",
    },
};

export const Installation = {
    render: () => (
        <div className="sb-unstyled max-w-4xl mx-auto p-8 space-y-8">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Installation & Setup</h2>
                <p className="text-lg">
                    Get started with the Xola UI Kit in your React project in just a few steps.
                </p>
            </div>

            <div className="space-y-6">
                {/* Package Info */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Published Packages</h2>
                    <div className="space-y-2 text-md">
                        <p>This repository is published as two NPM packages:</p>
                        <div className="grid md:grid-cols-2 gap-4 text-md pl-4">
                            <a
                                href="https://www.npmjs.com/package/@xola/ui-kit"
                                className="rounded-md"
                            >
                                <div className="font-semibold text-primary">@xola/ui-kit</div>
                                <div className="text-sm">React components & utilities</div>
                            </a>
                            <a
                                href="https://www.npmjs.com/package/@xola/icons"
                                className="rounded-md"
                            >
                                <div className="font-semibold text-primary">@xola/icons</div>
                                <div className="text-sm">Icon library</div>
                            </a>
                        </div>
                        <p>
                            View the live Storybook at <a href="https://ui.xola.io" className="text-primary hover:underline font-medium">ui.xola.io</a>
                        </p>
                    </div>
                </div>

                {/* Requirements */}
                <div className="bg-yellow-lighter p-4 rounded border border-yellow-light space-y-4">
                    <h2 className="text-md">Requirements</h2>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-yellow rounded-full mr-3"></span>
                            <span>Node.js v20</span>
                        </li>
                        <li className="flex items-center">
                            <span className="w-2 h-2 bg-yellow rounded-full mr-3"></span>
                            <span>NPM v8 or higher</span>
                        </li>
                    </ul>
                </div>

                {/* Usage Instructions */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Quick Start</h2>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="text-md">1. Install the UI Kit</div>
                            <pre className="bg-black/90 text-white p-3 text-sm rounded-md overflow-x-auto">
                                <code>npm install @xola/ui-kit</code>
                            </pre>
                        </div>

                        <div className="space-y-2">
                            <div className="text-md">2. Install Peer Dependencies</div>
                            <pre className="bg-black/90 text-white p-3 text-sm rounded-md overflow-x-auto">
                                <code>npm install autoprefixer postcss tailwindcss lodash</code>
                            </pre>
                        </div>

                        <div className="space-y-2">
                            <div className="text-md">3. Create Config Files</div>
                            <pre className="bg-black/90 text-white p-3 text-sm rounded-md overflow-x-auto">
                                <code>{`echo 'module.exports = require("@xola/ui-kit/tailwind.config");' > tailwind.config.js
echo 'module.exports = require("@xola/ui-kit/postcss.config");' > postcss.config.js`}</code>
                            </pre>
                        </div>

                        <div className="space-y-2">
                            <div className="text-md">4. Import CSS Files</div>
                            <pre className="bg-black/90 text-white text-sm p-3 rounded-md overflow-x-auto">
                                <code>{`import "@xola/ui-kit/index.css";
import "@xola/ui-kit/build/style.css";`}</code>
                            </pre>
                        </div>

                        <div className="space-y-2">
                            <div className="text-md">5. Use Components</div>
                            <pre className="bg-black/90 text-white text-sm p-3 rounded-md overflow-x-auto">
                                <code>{`import { Button } from "@xola/ui-kit";`}</code>
                            </pre>
                        </div>
                    </div>

                    <div className="p-4 bg-blue-lighter rounded-md">
                        <p className="text-base">
                            <strong>Note:</strong> The UI Kit expects you to have a working React development environment with PostCSS support.
                        </p>
                    </div>
                </div>

                {/* Development Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Development</h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="text-md">Install Dependencies</div>
                            <pre className="bg-black/90 text-white p-3 rounded-md text-sm overflow-x-auto">
                                <code>{`nvm use  # Project needs Node.js v20 with NPM v8
npm install`}</code>
                            </pre>
                        </div>

                        <div className="space-y-2">
                            <div className="text-md">Start Storybook</div>
                            <pre className="bg-black/90 text-white p-3 rounded-md text-sm overflow-x-auto">
                                <code>npm start</code>
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Advanced Setup */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Advanced: Local Development</h2>
                    <p>
                        To integrate your app with a locally installed UI Kit, set up an NPM workspace.
                        Both <code className="bg-gray-lighter p-1 rounded">ui-kit</code> and{" "}
                        <code className="bg-gray-lighter p-1 rounded">your-project</code> must be in the same directory.
                    </p>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="">1. Create Workspace Package</div>
                            <pre className="bg-black/90 text-white p-4 rounded-md overflow-x-auto text-sm">
                                <code>{`{
  "workspaces": ["ui-kit", "your-project"]
}`}</code>
                            </pre>
                        </div>

                        <div className="space-y-2">
                            <div className="">2. Copy Config Files</div>
                            <pre className="bg-black/90 text-white p-4 rounded-md overflow-x-auto text-sm">
                                <code>{`cd workspace
cp ui-kit/.npmrc .
cp ui-kit/.nvmrc .`}</code>
                            </pre>
                        </div>

                        <div className="space-y-2">
                            <div className="">3. Install & Watch</div>
                            <pre className="bg-black/90 text-white p-4 rounded-md overflow-x-auto text-sm">
                                <code>{`npm install
cd ui-kit
npm run build -- --watch`}</code>
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Testing */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Testing</h2>
                    <p className="mb-4">This project uses Vitest for unit testing:</p>
                    <div className="space-y-2">
                        <pre className="bg-black/90 text-white p-3 rounded-md overflow-x-auto text-sm">
                            <code>npm test              # Run tests in watch mode</code>
                        </pre>
                        <pre className="bg-black/90 text-white p-3 rounded-md overflow-x-auto text-sm">
                            <code>npm test -- --run     # Run tests once (CI mode)</code>
                        </pre>
                        <pre className="bg-black/90 text-white p-3 rounded-md overflow-x-auto text-sm">
                            <code>npm run test:coverage # Run with coverage report</code>
                        </pre>
                    </div>
                </div>

                {/* Important Notes */}
                <div className="bg-yellow-lighter p-4 rounded border border-yellow-light space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Important Notes</h2>
                    <p>
                        To avoid issues with NPM v8 peer dependencies resolution, we enabled the{" "}
                        <code className="bg-gray-lighter p-1 rounded">legacy-peer-deps</code> rule in{" "}
                        <code className="bg-gray-lighter p-1 rounded">.npmrc</code>.
                    </p>
                    <p>
                        Use the same <code className="bg-gray-lighter p-1 rounded">.npmrc</code> file in your projects,
                        or always run installs with the <code className="bg-gray-lighter p-1 rounded">--legacy-peer-deps</code> flag:
                    </p>
                    <pre className="bg-black/90 text-white p-3 rounded-md overflow-x-auto text-sm">
                        <code>npm install --legacy-peer-deps</code>
                    </pre>
                </div>

                {/* Publishing */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Publishing the Package</h2>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="">1. Install np</div>
                            <pre className="bg-black/90 text-white p-3 rounded-md overflow-x-auto text-sm">
                                <code>npm -g install np</code>
                            </pre>
                        </div>

                        <div className="space-y-2">
                            <div className="">2. Build & Publish</div>
                            <pre className="bg-black/90 text-white p-3 rounded-md overflow-x-auto text-sm">
                                <code>{`npm run build
np <your-new-version> --tag=latest --yolo`}</code>
                            </pre>
                        </div>

                        <div className="space-y-2">
                            <div className="">3. Push Tags</div>
                            <pre className="bg-black/90 text-white p-3 rounded-md overflow-x-auto text-sm">
                                <code>git push &lt;upstream-remote&gt; master --tags</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
};
