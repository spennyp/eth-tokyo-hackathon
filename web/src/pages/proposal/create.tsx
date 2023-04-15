import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark } from "@chakra-ui/react";
import { Input, Select } from "@chakra-ui/react";
import { Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { tokens } from "../../../common/tokens";

export default function CreateProposal() {
    let [value, setValue] = useState("");
    let [bioValue, setBioValue] = useState("");
    const format = (val: string) => `$` + val;
    const parse = (val: string) => val.replace(/^\$/, "");
    const [loanAmount, setLoanAmount] = useState("1");
    const [loanLength, setLoanLength] = useState(12);
    const [interestRate, setInterestRate] = useState(1.5);
    const [country, setCountry] = useState("");
    const [token, setToken] = useState({ name: "", address: "", symbol: "" });

    const labelStyles = {
        mt: "2",
        fontSize: "sm",
    };

    let handleInputChange = (e: any) => {
        let inputValue = e?.target?.value;
        setValue(inputValue);
    };

    let handleInputBioChange = (e: any) => {
        let inputValue = e?.target?.value;
        setBioValue(inputValue);
    };

    // This function is triggered when the select changes
    const selectCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setCountry(value);
        console.log(value);
    };

    // This function is triggered when the select changes
    const selectTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as any;
        setToken({ name: "", address: value, symbol: "" });
    };

    const submitProposal = () => {
        console.log("loan amount", loanAmount);
        console.log("loan duration", loanLength);
        console.log("loan interest", interestRate);
        console.log("token", token);
        console.log("country", country);
    };

    return (
        <div className="flex flex-row justify-center w-full">
            <div className="flex flex-col justify-start max-w-[400px] w-[400px] self-center space-y-4">
                <p className="text-2xl font-bold">Create Proposal</p>
                <p className=""></p>
                <FormControl isRequired>
                    <FormLabel>First name</FormLabel>
                    <Input placeholder="First name" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Last name</FormLabel>
                    <Input placeholder="Last name" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Country</FormLabel>
                    <Select placeholder="Select country" onChange={selectCountryChange}>
                        {countryList.map((country, id) => {
                            return (
                                <option key={id} value={country}>
                                    {country}
                                </option>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Token</FormLabel>
                    <Select placeholder="Select Loan Token" onChange={selectTokenChange}>
                        {tokens.map((token, id) => {
                            return (
                                <option key={id} value={token.address}>
                                    {token.symbol}
                                </option>
                            );
                        })}
                    </Select>
                </FormControl>
                <FormControl className="">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                    <FormHelperText>Well never share your email.</FormHelperText>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Bio</FormLabel>
                    <Textarea
                        value={bioValue}
                        onChange={handleInputBioChange}
                        placeholder="Tell us about you"
                        size="sm"
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        value={value}
                        onChange={handleInputChange}
                        placeholder="What will your loan be used for?"
                        size="sm"
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Total Loan Amount</FormLabel>
                    <NumberInput
                        onChange={(valueString) => setLoanAmount(parse(valueString))}
                        value={format(loanAmount)}
                        min={1}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>
                        Loan Period: {loanLength} month{loanLength !== 1 && "s"}
                    </FormLabel>
                    <Slider aria-label="slider-ex-6" min={1} max={24} onChange={(val) => setLoanLength(val)}>
                        <SliderMark value={3} {...labelStyles}>
                            3
                        </SliderMark>
                        <SliderMark value={6} {...labelStyles}>
                            6
                        </SliderMark>
                        <SliderMark value={9} {...labelStyles}>
                            9
                        </SliderMark>
                        <SliderMark value={12} {...labelStyles}>
                            12
                        </SliderMark>
                        <SliderMark value={15} {...labelStyles}>
                            15
                        </SliderMark>
                        <SliderMark value={18} {...labelStyles}>
                            18
                        </SliderMark>
                        <SliderMark value={21} {...labelStyles}>
                            21
                        </SliderMark>
                        <SliderMark value={24} {...labelStyles}>
                            24
                        </SliderMark>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Interest Rate: {interestRate}%</FormLabel>
                    <Slider
                        aria-label="slider-ex-6"
                        min={0}
                        max={3}
                        step={0.25}
                        onChange={(val) => setInterestRate(val)}
                    >
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </FormControl>
                {/* TODO: BEN - upload video */}
                <button className="h-[40px] w-fit items-center justify-center rounded-[6px]  px-[20px] py-[10px] text-[14px] font-semibold leading-[] cursor-pointer bg-black text-white">
                    Upload Video
                </button>
                <button
                    onClick={submitProposal}
                    className="h-[40px] w-fit items-center justify-center rounded-[6px]  px-[20px] py-[10px] text-[14px] font-semibold leading-[] cursor-pointer bg-black text-white"
                >
                    Create Proposal
                </button>
            </div>
        </div>
    );
}

const countryList = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Cayman Islands",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D Ivoire",
    "Croatia",
    "Cruise Ship",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Polynesia",
    "French West Indies",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Kyrgyz Republic",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Pierre &amp; Miquelon",
    "Samoa",
    "San Marino",
    "Satellite",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "St Kitts &amp; Nevis",
    "St Lucia",
    "St Vincent",
    "St. Lucia",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor L'Este",
    "Togo",
    "Tonga",
    "Trinidad &amp; Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks &amp; Caicos",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (US)",
    "Yemen",
    "Zambia",
    "Zimbabwe",
];
