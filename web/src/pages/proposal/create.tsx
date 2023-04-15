import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";

export default function CreateProposal() {
    let [value, setValue] = useState("");

    let handleInputChange = (e: any) => {
        let inputValue = e?.target?.value;
        setValue(inputValue);
    };
    return (
        <div className="flex flex-row justify-center w-full">
            <div className="flex flex-col justify-start max-w-[400px] w-[400px] self-center">
                <Text>ASD</Text>
                <FormControl className="">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                    <FormHelperText>Well never share your email.</FormHelperText>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>First name</FormLabel>
                    <Input placeholder="First name" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Last name</FormLabel>
                    <Input placeholder="Last name" />
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
            </div>
        </div>
    );
}
