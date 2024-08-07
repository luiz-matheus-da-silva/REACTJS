import { Box, Divider, Image, ListIcon, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { BiTrashAlt } from "react-icons/bi";
import { TbCircleLetterEFilled } from "react-icons/tb";

export default function MusicListItem(props: {
    favorites: any[];
    musicImg: string;
    musicName: string;
    artistName: string;
    musicExplicit: string;
    index: number;
    removeMusic: (index: number) => void

}) {
    return (
        <OrderedList color='white'>
            <div>
                <ListItem display='flex' alignItems='center' justifyContent='space-between' padding='10px 0'>
                    <Box display='flex' alignItems='center' gap='15px'>
                        <Image
                            src={props.musicImg}
                            alt={props.musicName}
                            borderRadius='md'
                            boxSize='60px'
                            objectFit='cover'
                        />
                        <Box>
                            <Text color='white' fontWeight='bold'>{props.musicName}</Text>
                            <Text color='gray.400'>
                                {props.artistName}
                                {props.musicExplicit === 'explicit' && <TbCircleLetterEFilled fontSize='20px' color='white' display='inline' />}
                            </Text>
                        </Box>
                    </Box>
                    <Box>
                        <ListIcon as={BiTrashAlt} color='white' fontSize='24px' cursor='pointer' onClick={() => props.removeMusic(props.index)}/>
                    </Box>
                </ListItem>
                <Divider borderColor='gray.700' />
            </div>
        </OrderedList>
    );
}
