import { Button, ButtonGroup } from "@chakra-ui/react";

export default function Filters(props:{
    albumFilter: () => void;
    artistFilter: () => void;
    songFilter: () => void;

}) {
    return (
        <ButtonGroup>
            <Button  colorScheme='teal'>Tudo</Button>
            <Button colorScheme='teal' onClick={props.songFilter}>Músicas</Button>
            <Button colorScheme='teal' onClick={props.artistFilter}>Artistas</Button>
            <Button colorScheme='teal' onClick={props.albumFilter}>Álbuns</Button>
        </ButtonGroup>
    )
}