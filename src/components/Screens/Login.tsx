import React, { useState } from "react";
import { XolaLogoSimple } from "../../icons";
import { Alert } from "../Alert";
import { Button } from "../Buttons/Button";
import { Checkbox } from "../Forms/Checkbox";
import { FormGroup } from "../Forms/FormGroup";
import { Input } from "../Forms/Input";
import { Label } from "../Forms/Label";
import { Spinner } from "../Spinner";

const backgrounds = {
    default: "https://files.xola.com/x2/images/login/old-photo-1554629947-334ff61d85dc.jpeg",
    x2: "https://files.xola.com/x2/images/login/x2-34fc260271ca80160c61777846784611.jpeg",
    admin: "https://files.xola.com/x2/images/login/admin-42e40b1836193f064f0fe0fafce1d2af.png",
    scaffold: "https://files.xola.com/x2/images/login/scaffold-f3bd19169b6976f1c75da53e7b61d0a7.jpeg",
} as const;

type BackgroundType = keyof typeof backgrounds;

export interface LoginValues {
    email: string;
    password: string;
    shouldRemember: boolean;
}

export interface LoginProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
    readonly defaultValues?: Partial<LoginValues>;
    readonly isLoading?: boolean;
    readonly error?: string | null;
    readonly onSubmit?: (values: LoginValues) => void;
    readonly passwordResetUrl?: string;
    readonly label?: React.ReactNode;
    readonly backgroundImage?: string | null;
    readonly backgroundType?: BackgroundType;
}

export const Login = ({
    defaultValues,
    isLoading = false,
    error = null,
    onSubmit,
    passwordResetUrl,
    label,
    backgroundImage = null,
    backgroundType = "default",
    ...rest
}: LoginProps) => {
    const [values, setValues] = useState<LoginValues>({
        email: "",
        password: "",
        shouldRemember: false,
        ...defaultValues,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setValues({ ...values, [name]: checked });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit?.(values);
    };

    const backgroundImageUrl = backgroundImage ?? backgrounds[backgroundType] ?? backgrounds.default;
    const style = {
        backgroundImage: `url("${backgroundImageUrl}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    };

    return (
        <div
            className="ui-login h-screen overflow-hidden bg-white bg-opacity-100 bg-blend-overlay md:bg-opacity-0"
            style={style}
            {...rest}
        >
            <div className="md:full flex h-[88%] w-full flex-col items-center justify-center space-y-8">
                <div className="w-85 rounded-lg px-9 py-0 md:bg-white md:py-10">
                    <div className="mb-12 space-y-4 md:mb-20">
                        <XolaLogoSimple className="mx-auto h-10 w-auto md:h-12" />
                        {label && <div className="flex items-center justify-center">{label}</div>}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <fieldset className="space-y-6" disabled={isLoading}>
                            <div className="-space-y-px rounded-md bg-white">
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

                            <div className="mt-5 text-center text-sm">
                                <a
                                    href={passwordResetUrl}
                                    className="font-semibold text-gray-darker underline hover:text-black"
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
                <div className="flex w-full flex-col items-center justify-center overflow-hidden px-4 py-1 sm:px-6 lg:px-8">
                    <div className="m-5 w-85 rounded-lg px-4 text-center text-xs opacity-80 md:text-sm">
                        <a
                            href="https://www.xola.com/team"
                            target="_blank"
                            className="text-gray md:text-gray-dark"
                            rel="noreferrer"
                        >
                            Designed in San Francisco & Rouen, France
                            <br />
                            Built in Houston, Belgrade, Ukraine &amp; Bengaluru
                        </a>
                        <div className="text-center text-gray md:text-gray-dark">
                            &copy; {new Date().getFullYear()} Xola, Inc.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
