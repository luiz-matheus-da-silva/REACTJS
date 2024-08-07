import { useEffect, useState } from "react";
import MusicListItem from "../../components/MusicListItem";
import { Alert, AlertIcon, Box, Button, Spinner, Link as ChakraLink, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BiHome } from "react-icons/bi";

export default function Favorites() {
    const [favorites, setFavorites] = useState<any[]>([]); // Estado para armazenar as músicas favoritas
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [alert, setAlert] = useState(false); // Estado para controlar a exibição do alerta

    // Função para remover uma música dos favoritos
    const removeMusic = (index: number) => {
        const updateFavorites = [...favorites];
        updateFavorites.splice(index, 1);

        setFavorites(updateFavorites); // Atualiza o estado com a nova lista de favoritos
        localStorage.setItem('favoriteMusics', JSON.stringify(updateFavorites)); // Atualiza os favoritos no localStorage
        setAlert(true); // Exibe o alerta de sucesso
    };

    // useEffect para carregar as músicas favoritas do localStorage quando o componente é montado
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteMusics') || '[]');
        setFavorites(storedFavorites); // Atualiza o estado com as músicas favoritas do localStorage
        setLoading(false); // Desativa o estado de carregamento
    }, []);

    // useEffect para definir um timer para esconder o alerta após 3 segundos
    useEffect(() => {
        const timer = setTimeout(() => setAlert(false), 3000);
        return () => clearTimeout(timer);
    }, [alert]);

    return (
        <>
            <ChakraLink as={Link} to="/" color="teal.500" fontSize="lg" fontWeight="bold" display="flex" alignItems="center" mb={2}>
                <Icon as={BiHome} boxSize={6} m={2} />
                Voltar ao Início
            </ChakraLink>
            {
                loading ? (
                    <Box display="flex" justifyContent="center" height='100vh' alignItems="center" width="100%">
                        <Spinner size="xl" color="teal.500" />
                    </Box>
                ) : (
                    favorites.length > 0 ? (
                        favorites.map((favorite, index) => (
                            <MusicListItem
                                key={index}
                                favorites={favorites}
                                musicImg={favorite.musicImg}
                                musicName={favorite.musicName}
                                artistName={favorite.artistName}
                                musicExplicit={favorite.musicExplicit}
                                index={index}
                                removeMusic={removeMusic}
                            />
                        ))
                    ) : (
                        <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" width="100%" height='100vh' color='gray.400'>
                            Você ainda não favoritou nenhuma música
                            <Link to='/'><Button marginTop='15px' background='teal.500'>Buscar Músicas</Button></Link>
                        </Box>
                    )
                )
            }
            {
                alert && (
                    <Alert status='success' position='fixed' bottom='20px' left='50%' transform='translateX(-50%)' width='auto'>
                        <AlertIcon />
                        Música removida dos favoritos.
                    </Alert>
                )
            }
        </>
    );
}
