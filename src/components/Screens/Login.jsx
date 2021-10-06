import PropTypes from "prop-types";
import React, { useState } from "react";
import XolaLogo from "../../images/XolaLogo";
import { Alert } from "../Alert";
import { Button } from "../Button";
import { Checkbox } from "../Forms/Checkbox";
import { FormGroup } from "../Forms/FormGroup";
import { Input } from "../Forms/Input";
import { Label } from "../Forms/Label";
import { Spinner } from "../Spinner";
import "./Login.css";

export const Login = ({ defaultValues, isLoading = false, error = null, onSubmit }) => {
    const [values, setValues] = useState({ email: "", password: "", shouldRemember: false, ...defaultValues });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setValues({ ...values, [name]: checked });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(values);
    };

    return (
        <div className="overflow-hidden h-screen bg-white bg-opacity-40 ui-login login-container">
            <div className="flex flex-col justify-center items-center space-y-8 w-full h-[90%] md:full">
                <div className="py-0 px-9 rounded-lg md:py-10 md:bg-white w-82">
                    <div className="mb-12 md:mb-10">
                        <XolaLogo className="mx-auto w-auto h-10 md:mb-20 md:h-12" />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <fieldset className="space-y-6" disabled={isLoading}>
                            <div className="-space-y-px bg-white rounded-md">
                                <FormGroup className="md:mb-7">
                                    <Label>Email</Label>

                                    <Input
                                        required
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={values.email}
                                        isError={!!error}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Password</Label>

                                    <Input
                                        required
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={values.password}
                                        isError={!!error}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </div>

                            <Checkbox
                                name="shouldRemember"
                                label="Remember me"
                                checked={values.shouldRemember}
                                onChange={handleCheckboxChange}
                            />

                            {error ? <Alert color="danger">{error}</Alert> : null}

                            <Button type="submit" className="w-full" color="primary">
                                {isLoading ? <Spinner size="current" color="current" className="mr-2" /> : null}
                                Login
                            </Button>

                            <div className="mt-5 text-sm text-center">
                                <a
                                    // TODO: Link should be changed to the right environment
                                    href="https://xola.com/resetting/form"
                                    className="font-semibold underline hover:text-black text-gray-darker"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>

            <footer>
                <div className="flex overflow-hidden flex-col justify-center items-center py-1 px-4 w-full sm:px-6 lg:px-8">
                    <div className="px-4 m-5 text-xs text-center rounded-lg opacity-30 md:text-sm hover:opacity-80 w-82">
                        <a href="https://www.xola.com/team" target="_blank" className="md:text-gray" rel="noreferrer">
                            Handcrafted in Houston, Belgrade &amp; Bengaluru
                            <div className="text-center">&copy; {new Date().getFullYear()} Xola, Inc.</div>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

Login.propTypes = {
    defaultValues: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
        shouldRemember: PropTypes.bool,
    }),
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    onSubmit: PropTypes.func,
};
