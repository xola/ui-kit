// https://storybook.js.org/docs/react/essentials/controls
// Conditional controls: https://storybook.js.org/docs/react/essentials/controls#conditional-controls

export const disableType = {
    table: { disable: true },
};

export const disableFields = (fields: string[]) => {
    const argTypes = fields.map((field) => ({ [field]: disableType }));
    return Object.assign({}, ...argTypes);
};

export const arrayValues = (name: string, values: string[], ...rest: any) => {
    return { control: name, options: values, ...rest[0] };
};

export const inlineRadio = (values: string[], ...rest: any) => {
    return arrayValues("inline-radio", values, ...rest);
};

export const radio = (values: string[], ...rest: any) => {
    return arrayValues("radio", values, ...rest);
};

export const select = (values: string[], ...rest: any) => {
    return arrayValues("select", values, ...rest);
};

export const tableDefault = (summary: string) => {
    return {
        table: { defaultValue: { summary } },
    };
};

export const sizeParams = inlineRadio(["small", "medium", "large"], tableDefault("medium"));

// argTypes
// {
//     [key: string]: {
//       control?: ControlType | { type: ControlType; /* See below for more */ };
//       description?: string;
//       if?: Conditional;
//       mapping?: { [key: string]: { [option: string]: any } };
//       name?: string;
//       options?: string[];
//       table?: {
//         category?: string;
//         defaultValue?: { summary: string; detail?: string };
//         subcategory?: string;
//         type?: { summary?: string; detail?: string };
//       },
//       type?: SBType | SBScalarType['name'];
//     }
//   }
