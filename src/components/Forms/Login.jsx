import { LockIcon } from "../../icons/LockIcon";
import { Button } from "../Button";

const links = [
    { name: "Blog", href: "https://blog.xola.com/" },
    { name: "Help Center", href: "https://help.xola.com" },
    { name: "Careers", href: "https://www.xola.com/team" },
    { name: "Terms of Use", href: "https://www.xola.com/terms" },
    { name: "Privacy Policy", href: "https://www.xola.com/privacy-policy" },
];

export const Login = ({ className, onSubmit, ...rest }) => {

    const onClick = (e) => {
        e.preventDefault();
        const email = document.querySelector('input[type=email]').value;
        const password = document.querySelector('input[type=password]').value;
        console.log('Form should get email & password and give it to on submit');
        onSubmit(email, password);
    }

    return (
        <div className="flex flex-col h-screen bg-opacity-40 bg-blue-lighter">
            <div className="flex-grow">
                <div className="flex flex-col items-center justify-center w-full h-full space-y-8">
                    <div className="w-11/12 md:w-2/5">
                        <div className="mb-4 md:mb-10">
                            <img
                                className="w-auto h-10 mx-auto md:h-12"
                                src="https://www.xola.com/images/xola-logo-black-small.png"
                                alt="Xola Logo"
                            />
                            <h2 className="mt-6 text-xl font-bold text-center md:text-3xl text-gray-darker">
                                Sign in to your account
                            </h2>
                        </div>
                        {/* TODO Form */}
                        <form className="space-y-6" onSubmit={onClick}>
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    {/* Change component */}
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="relative block w-full px-3 py-1 text-sm border rounded-none appearance-none md:px-3 md:py-2 border-gray-dark text-gray-darker placeholder-dark rounded-t-md focus:outline-none focus:ring-primary focus:border-blue-dark focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div>
                                    {/* Change component */}
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="relative block w-full px-3 py-1 text-sm border rounded-none appearance-none y-1 md:px-3 md:py-2 border-gray-dark placeholder-darker text-gray-darker rounded-b-md focus:outline-none focus:ring-primary focus:blue-dark focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="w-4 h-4 rounded text-primary border-gray-light focus:primary"
                                    />
                                    <label htmlFor="remember_me" className="block ml-2 text-sm text-gray-dark">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a
                                        href="https://xola.com/resetting/form"
                                        className="font-medium text-gray-dark hover:text-primary hover:underline"
                                        target="_blank"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <Button color="success" className="relative flex justify-center w-full">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <LockIcon className="w-5 h-5 text-white" />
                                    </span>
                                    Login to Xola
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <footer className="">
                <div className="px-4 py-1 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
                    <nav className="flex-wrap justify-center hidden -mx-5 -my-2 md:flex">
                        {links.map((link) => (
                            <div key={link.name} className="px-2 py-1 md:px-5 md:py-2">
                                <a href={link.href} className="text-sm md:text-base text-gray-dark hover:text-gray-darker">
                                    {link.name}
                                </a>
                            </div>
                        ))}
                    </nav>
                    <p className="m-4 text-xs text-center md:text-sm text-gray">
                        <a href="https://www.xola.com/team" target="blank" className="">
                            Handcrafted in Houston, Belgrade & Bengaluru &nbsp;&nbsp;
                            <div className="md:hidden" />
                            &copy; {new Date().getFullYear()} Xola, Inc. <br />
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
};
