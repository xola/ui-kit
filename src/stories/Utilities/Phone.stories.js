import _ from "lodash";
import React from "react";
import { Phone } from "../..";

export default {
    title: "Utilities/Phone",
    component: Phone,
    parameters: {
        docs: {
            description: {
                component: "Phone number formatting according to international standards",
            },
        },
    },
    argTypes: {
        number: {
            description: "A phone number",
            type: { required: true },
            defaultValue: "5402322157",
            control: { type: "text" },
            table: {
                type: { summary: null },
            },
        },
        countryCode: {
            description:
                "The country of the code seller to display the number in the seller country's format. This is available in `seller.countryCode`",
            type: { required: false },
            defaultValue: "US",
            control: { type: "text" },
            table: {
                type: { summary: null },
                defaultValue: { summary: "US" },
            },
        },
    },
};

export const Default = (props) => {
    return <PhoneDisplay {...props} />;
};

export const InvalidNumbers = () => {
    const invalidNumbers = ["5551239830 extension 9", "Just email me", "1234567890", "540232222"];

    return (
        <div className="space-y-4">
            {invalidNumbers.map((number) => {
                return <PhoneDisplay countryCode="US" number={number} />;
            })}
        </div>
    );
};

export const WithCountryCode = () => {
    return <PhoneDisplay countryCode="GB" number="7576060661" />;
};

export const USCountryAndIntlNumber = () => {
    return (
        <span className="space-y-4">
            {["+919538057572", "9538057572", "612745471", "+16475368727"].map((number) => {
                return <PhoneDisplay countryCode="US" number={number} />;
            })}
        </span>
    );
};

export const SellerPhoneNumbers = () => {
    const list = {
        "AU Australia": "0421 843 881",
        "PG Papua New Guinea": "1111906369",
        "PF French Polynesia": "8082581546",
        "VN Vietnam": "6503686583",
        "MX Mexico": "+5217449939088",
        "GB United Kingdom": "7901126172",
        "NL Netherlands": "1616306674",
        "IN India": "9999897512",
        "CN China": "+861484543445",
        "AW Aruba": "297-720-6083",
        "DE Germany": "+41755630117",
        "PE Peru": "(51) 534622531",
        "ZA South Africa": "1-532-831-4516",
        "JP Japan": "090024313",
        "AR Argentina": "6504581",
        "GR Greece": "+16475368727",
        "ES Spain": "+34612745471",
        "RO Romania": "0741.682.177",
        "HK Hong Kong": "+852 8947 6726",
        "NZ New Zealand": "64 27 562 3282 ",
        "PA Panama": "+507 5559-1245",
        "PL Poland": "48 522-123-133",
        "BM Bermuda": "441-286-2575",
        "CR Costa Rica": "2643 - 7103",
        "DO Dominican Republic": "809-240-7250",
        "HN Honduras": "+5045423411",
        "ET Ethiopia": "4132847160",
        "FR France": "+33628070787",
        "IT Italy": "+390416218328",
        "PT Portugal": "00.352.10.246.73.57",
        "IE Ireland": "+353 22 664 2203",
        "VI U.S. Virgin Islands": "(340) 757-3898",
        "AE United Arab Emirates": "+971 81-8459281",
        "CZ Czechia": "+420483670542",
        "EE Estonia": "+994411385422",
        "TZ Tanzania": "+4913786234246",
        "DK Denmark": "+4524555026",
        "BZ Belize": "+5012522475",
        "KH Cambodia": "+85572261424",
    };

    return (
        <>
            <div class="">
                <p className="mb-4">
                    These are obfuscated numbers of various non-US/CA sellers. This is how their numbers will look in
                    their own regions
                </p>

                <div className="grid grid-cols-3 gap-6">
                    {Object.keys(list).map((countryCode) => {
                        return <PhoneDisplay countryCode={countryCode} number={list[countryCode]} />;
                    })}
                </div>
            </div>
        </>
    );
};

const PhoneDisplay = ({ countryCode, number }) => {
    return (
        <div className="space-y-2">
            <div>
                <span className="inline-block mr-2 w-20 text-right">Country:</span>
                <span className="font-mono">{countryCode}</span>
            </div>

            <div>
                <span className="inline-block mr-2 w-20 text-right">Original:</span>
                <span className="font-mono">{number}</span>
            </div>

            <div>
                <span className="inline-block mr-2 w-20 text-right">Formatted:</span>

                <Phone className="font-mono" countryCode={countryCode.slice(0, 2)}>
                    {number}
                </Phone>
            </div>
        </div>
    );
};
