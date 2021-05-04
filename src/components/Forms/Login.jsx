import React, { useState } from "react";
import { Button } from "../Button";
import { FormGroup } from "../Forms/FormGroup";
import { Input } from "../Forms/Input";
import { Label } from "../Forms/Label";
import Checkbox from "./Checkbox";
import "./Login.css";

export const Login = ({ onSubmit }) => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setValues({ ...values, [name]: checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
    };

    return (
        <div className={"login-container h-screen bg-opacity-40 bg-white"}>
            <div className="flex-grow">
                <div className="flex flex-col items-center justify-center w-full h-screen md:full space-y-8">
                    <div className="px-9 py-0 md:py-10 rounded-lg w-82 md:bg-white">
                        <div className="mb-12 md:mb-10">
                            <img
                                className="w-auto h-10 mx-auto md:h-12 md:mb-20 "
                                src="https://www.xola.com/images/xola-logo-black-small.png"
                                alt="Xola Logo"
                            />
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="-space-y-px bg-white rounded-md">
                                <FormGroup className="md:mb-7">
                                    <Label>Email</Label>

                                    <Input
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={values.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Password</Label>

                                    <Input
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={values.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FormGroup>
                            </div>

                            <Checkbox
                                name="remember"
                                label="Remember me"
                                checked={values.remember}
                                onChange={handleCheckboxChange}
                            />

                            <Button className="w-full" color="primary">
                                Login
                            </Button>

                            <div className="mt-5 text-sm text-center">
                                <a
                                    href="https://xola.com/resetting/form"
                                    className="font-semibold underline text-gray-darker hover:text-black"
                                    target="_blank"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <footer>
                <div className="flex flex-col items-center justify-center w-full px-4 py-1 overflow-hidden sm:px-6 lg:px-8">
                    <div className="px-4 m-4 text-xs text-center rounded-lg w-82 md:text-sm opacity-30 hover:opacity-80">
                        <a href="https://www.xola.com/team" target="_blank" className="text-gray-dark">
                            Handcrafted in Houston, Belgrade & Bengaluru
                            <div className="text-center">&copy; {new Date().getFullYear()} Xola, Inc.</div>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};
