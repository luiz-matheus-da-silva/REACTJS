import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text} from "@chakra-ui/react";
import { BiHeart } from "react-icons/bi";

const MusicCard = (props: {
    musicName: string;
    artistName: string;
    musicImg: string;
    musicSrc: string;
    musicExplicit: string;
    index: number;
    isFavorite: boolean;
    favoriteMusic: (index: number) => void;
}) => {
    return (
        <Card
            width={{ base: '90%', md: '30%', lg: '20%' }}
            background='#1A202C'
            mt='15px'
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            boxShadow='2xl'
            minHeight='450px'
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
        >
            <CardBody p={4} textAlign='center'>
                <Image
                    src={props.musicImg}
                    alt={props.musicName}
                    borderRadius='md'
                    boxSize='150px'
                    objectFit='cover'
                    margin='auto'
                />
                <Stack mt='4' spacing='2'>
                    <Heading size='md' color='white' noOfLines={1}>
                        {props.musicName} <Text fontSize='md' color='gray.400' noOfLines={1}>{props.musicExplicit === 'explicit' && '(Explícito)'}</Text>
                    </Heading>
                    <Text fontSize='sm' color='gray.400' noOfLines={1}>
                        {props.artistName}
                    </Text>
                </Stack>
            </CardBody>
            <Divider borderColor='gray.600' />
            <CardFooter display='flex' flexDirection='column' alignItems='center' p={4}>
                <Box as="audio" controls width="100%">
                    <source src={props.musicSrc} type="audio/mpeg" />
                    <source src={props.musicSrc} type="audio/ogg" />
                    Your browser does not support the audio element.
                </Box>
                <ButtonGroup spacing='2' mt={3}>
                    <Button 
                        colorScheme='teal'
                        variant={props.isFavorite ? 'solid' : 'outline'} 
                        onClick={() => props.favoriteMusic(props.index)}
                    >
                        {props.isFavorite ? <BiHeart /> : <BiHeart />}
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default MusicCard;
