import { Alert, AlertIcon, Box, Spinner, Link as ChakraLink, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import SearchInput from "../../components/SearchInput";
import MusicCard from "../../components/MusicCard";
import { useEffect, useState } from "react";
import MusicModel from "../../model/MusicModel";
import { musicList } from "../../service/apiService";
import Filters from "../../components/Filters";

export default function Home() {
    // lista com as músicas da API
    const [musicCard, setMusicCard] = useState<MusicModel[]>([]);
    // palavra a ser pesquisada
    const [term, setTerm] = useState('');
    // define o tipo de conteúdo a ser buscado (música, álbum, artista...)
    const [entity, setEntity] = useState('musicTrack');
    // spinner de carregamento
    const [loading, setLoading] = useState(false);
    // mensagem de alerta
    const [alert, setAlert] = useState('');

    // chama a API quando o componente é montado
    useEffect(() => {
        fetchData();
    }, []);

    // define o tempo do alerta
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(''), 3000); // limpa o alerta após 3 segundos
            return () => clearTimeout(timer);
        }
    }, [alert]);

    // função para buscar dados da API e salvar no localStorage
    const fetchData = async (searchTerm = '', entityType = 'musicTrack') => {
        setLoading(true); // ativa o spinner de carregamento
        try {
            const response = await musicList(searchTerm, entityType); // busca dados da API
            const favorites = JSON.parse(localStorage.getItem('favoriteMusics') || '[]'); // recupera favoritos do localStorage
            const listTemp = response.results.map((item: any) => ({
                trackId: item.trackId,
                musicName: item.trackName,
                artistName: item.artistName,
                musicImg: item.artworkUrl100,
                musicSrc: item.previewUrl,
                musicExplicit: item.trackExplicitness,
                // verifica se a música já foi favoritada
                isFavorite: favorites.some((fav: any) => fav.trackId === item.trackId)
            }));
            setMusicCard(listTemp); // atualiza a lista de músicas
        } catch (error) {
            console.error('Failed to fetch music data:', error); // exibe erro no console
        } finally {
            setLoading(false); // desativa o spinner de carregamento
        }
    };

    // função para adicionar ou remover uma música dos favoritos
    const toggleFavorite = (index: number) => {
        const updatedMusicCard = [...musicCard];
        const favoriteSong = updatedMusicCard[index];
        let favorites = JSON.parse(localStorage.getItem('favoriteMusics') || '[]');

        if (favoriteSong.isFavorite) {
            // remove dos favoritos se já estiver favoritada
            favorites = favorites.filter((fav: any) => fav.trackId !== favoriteSong.trackId);
            favoriteSong.isFavorite = false;
        } else {
            // adiciona aos favoritos se não estiver favoritada
            favorites.push(favoriteSong);
            favoriteSong.isFavorite = true;
        }

        localStorage.setItem('favoriteMusics', JSON.stringify(favorites)); // atualiza favoritos no localStorage
        setMusicCard(updatedMusicCard); // atualiza lista de músicas
        setAlert(favoriteSong.isFavorite ? 'Música adicionada aos favoritos.' : 'Música removida dos favoritos.'); // exibe alerta
    };

    // função de busca
    const search = (searchTerm: string) => {
        setTerm(searchTerm); // atualiza o termo de busca
        fetchData(searchTerm, entity); // busca dados com o novo termo
    };

    // funções de filtro
    const albumFilter = () => {
        setEntity('album');
        fetchData(term, 'album');
    };

    const artistFilter = () => {
        setEntity('musicArtist');
        fetchData(term, 'musicArtist');
    };

    const songFilter = () => {
        setEntity('musicTrack');
        fetchData(term, 'musicTrack');
    };

    return (
        <Box backgroundColor="black" minHeight="100vh" padding="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <SearchInput search={search} /> 
            </Box>
            <ChakraLink as={Link} to="/favoritas" color="teal.500" fontSize="lg" fontWeight="bold" display="flex" alignItems="center" mb={2}>
                <Icon as={AiOutlineHeart} boxSize={6} mr={2} />
                Meus Favoritos 
            </ChakraLink>
            <Filters
                albumFilter={albumFilter}
                artistFilter={artistFilter}
                songFilter={songFilter}
            /> {/* Componentes de filtro */}
            <Box display='flex' flexWrap='wrap' justifyContent='center' alignItems='center' minHeight="80vh" mt={4}>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                        <Spinner size="xl" color="teal.500" /> 
                    </Box>
                ) : (
                    musicCard.length > 0 ? (
                        musicCard.map((card, index) => (
                            <MusicCard
                                key={index}
                                index={index}
                                musicName={card.musicName}
                                musicExplicit={card.musicExplicit}
                                artistName={card.artistName}
                                musicImg={card.musicImg}
                                musicSrc={card.musicSrc}
                                isFavorite={card.isFavorite}
                                favoriteMusic={toggleFavorite}
                            />
                        ))
                    ) : (
                        <Box color='gray.400' mt={4}>Nenhum resultado encontrado.</Box>
                    )
                )}
            </Box>
            {alert && (
                <Alert status='success' position='fixed' bottom='20px' left='50%' transform='translateX(-50%)' width='auto'>
                    <AlertIcon />
                    {alert} 
                </Alert>
            )}
        </Box>
    );
}
