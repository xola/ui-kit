// @ts-nocheck
export default {
    title: "Introduction",
    parameters: {
        previewTabs: {
            canvas: { hidden: true },
        },
        viewMode: "docs",
    },
};

export const Introduction = {
    render: () => (
        <div className="sb-unstyled max-w-4xl mx-auto p-8 space-y-4">
            <div>
                <h1 className="text-2xl font-semibold mb-4">
                    Welcome to the Xola UI Kit
                </h1>
                <p className="text-lg">
                    A comprehensive suite of React + Tailwind components designed for modern Xola applications.
                </p>
            </div>

            <div className="space-y-6">
                <div className="">
                    <h2 className="text-xl font-semibold mb-3">What is the UI Kit?</h2>
                    <p className="text-md">
                        This UI Kit is a suite of React + Tailwind components and helper libraries that conform to Xola's design
                        system and brand guidelines set by Xola's design team. It includes components like alerts, avatars, modals,
                        tooltips, and much more.
                    </p>
                </div>

                <div className="bg-white shadow-sm">
                    <h2 className="text-xl font-semibold mb-3">Why Use It?</h2>
                    <ul className="space-y-2">
                        <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span>Ensures consistent design patterns across all Xola products</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span>Follows industry best practices for accessibility and performance</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span>Reduces development time with pre-built, tested components</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary mr-2">✓</span>
                            <span>Built from scratch for the new Xola brand</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-yellow-lighter px-4 py-6 rounded border border-yellow-light">
                    <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
                    <p className="text-gray-darker mb-4">
                        Click on each component in the left sidebar to view its design. Use the <strong>"Docs"</strong> tab
                        in the top toolbar to explore configuration parameters and try them out live! Click <strong>"Show Code"</strong>
                        to see implementation examples.
                    </p>
                    <a
                        href="/?path=/story/installation--installation"
                        className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                    >
                        View Installation Guide →
                    </a>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg py-6">
                        <h3 className="text-xl font-semibold mb-4">Core Technologies</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                                <span>React v18 (using <a href="https://reactjs.org/docs/hooks-overview.html" className="text-primary hover:underline">hooks</a>)</span>
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                                <span><a href="https://tailwindcss.com" className="text-primary hover:underline">Tailwind CSS</a> v3.x</span>
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                                <span><a href="https://storybook.js.org/" className="text-primary hover:underline">Storybook JS</a> v8.x</span>
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                                <span><a href="https://vitejs.dev/" className="text-primary hover:underline">Vite</a> - Dev Server & Build Tool</span>
                            </li>
                        </ul>
                        <p className="mt-4 text-sm text-gray-darker">
                            See <code className="bg-gray-lighter px-2 py-1 rounded text-sm">package.json</code> for other packages
                        </p>
                    </div>

                    <div className="bg-white rounded-lg py-6">
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="https://ui.xola.io" className="text-primary hover:underline font-medium">
                                    📚 Live Storybook
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/xola/ui-kit" className="text-primary hover:underline font-medium">
                                    💻 Source Code on GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://www.npmjs.com/package/@xola/ui-kit" className="text-primary hover:underline font-medium">
                                    📦 NPM Package
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="rounded">
                    <h3 className="text-xl font-semibold mb-4">The Magicians ✨</h3>
                    <div className="space-y-2">
                        <p>
                            <strong>Design:</strong> Barthélémy Chalvet & Team Bruno, J Scott Zimmerman & Anush Ramani
                        </p>
                        <p>
                            <strong>Development:</strong> Nemanja Krstić, Rushi Vishavadia{" "}
                            <a href="https://github.com/xola/ui-kit/graphs/contributors" className="text-primary hover:underline">
                                and more
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ),
};
