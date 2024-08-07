import { Box, Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export default function SearchInput(props: { search: (text: string) => void }) {
    const [inputText, setInputText] = useState('')
    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" my="15px">
            <InputGroup background="#1A202C" borderRadius="md">
                <Input 
                    placeholder="Encontre sua música favorita" 
                    border="none" 
                    _placeholder={{ color: 'gray.500' }} 
                    focusBorderColor="teal.500"
                    textColor='white'
                    onChange={(e) => setInputText(e.target.value)}
                />
                <InputRightElement>
                    <IconButton
                        aria-label="Search music"
                        icon={<FaMagnifyingGlass />}
                        colorScheme="teal"
                        variant="ghost"
                        onClick={() => props.search(inputText)}
                        pointerEvents="all"
                    />
                </InputRightElement>
            </InputGroup>
        </Box>
    );
}
