import { View, Text, Image, FlatList, StyleSheet, TouchableHighlight, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { LIVRES, CATEGORIES } from '../simple_data/data'
import { useState } from 'react';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    }
    return str.substr(0, maxLength) + '...';
}

function HomeScreen() {
    const [livres, setLivre] = useState(LIVRES);
    
    const [search, setSearch] = useState('');
    const handleSearch = (text) => {
        setSearch(text);
        const filteredLivres = LIVRES.filter((livre) => {
            const textToSearch = text.toLowerCase();
            const livreTitle = livre.titre.toLowerCase();
            return livreTitle.indexOf(textToSearch) > -1;
        });
        setLivre(filteredLivres);
    };

    livres.sort((a, b) => a.titre.localeCompare(b.titre));

    const navigation = useNavigation();

    const renderItem = ({ item }) => {
        const categoriesToShow = item.categorieId.slice(0, 1);
        const remainingCategories = item.categorieId.length - 1;

        const truncatedTitle = truncateString(item.titre, 20);

        return (
            <View key={item.id} style={styles.containerLivres}>
                <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => navigation.navigate('Details', { item })}>
                    <View style={styles.containerLivre}>
                        <Image source={{ uri: item.imageUrl }} style={styles.imageLivre} />
                        <View style={styles.containerCategorie}>
                            {categoriesToShow.map((categorieId) => {
                                const categorie = CATEGORIES.find((c) => c.id === categorieId);
                                if (categorie) {
                                    const categorieNom = capitalizeFirstLetter(categorie.genre);
                                    return (
                                        <Text
                                            style={[
                                                styles.contentCategorie,
                                                { backgroundColor: categorie.couleur.toUpperCase() },
                                            ]} key={categorie.id}
                                            >
                                            {categorieNom}
                                        </Text>
                                    );
                                }
                                return null;
                            })}

                            {remainingCategories > 0 && (
                                <Text style={styles.remainingCategories}>
                                    +{remainingCategories}
                                </Text>
                            )}
                        </View>
                        <Text style={styles.containerLivreTitle}>{truncatedTitle} - T.{item.tomes}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    };

    return (
        <>
            <TextInput style={styles.search} placeholder='Recherche un livre par son nom' value={search} onChangeText={handleSearch} ></TextInput>
            <FlatList
                data={livres}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.livreContainer}
            />
        </>
    );
}

const styles = StyleSheet.create({
    containerLivres: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
        padding: 10,
        borderRadius: 5,
        width: 175,
        height: 250,
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
    },

    containerLivre: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageLivre: {
        width: '100%',
        height: 150,
        aspectRatio: 1,
        resizeMode: 'contain',
        marginTop: 10,
    },

    containerLivreTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5,
    },

    remainingCategories: {
        color: 'black',
        fontWeight: 'bold',
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
    },

    containerCategorie: {
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
    },

    contentCategorie: {
        padding: 5,
        margin: 5,
        borderRadius: 5,
        color: 'white',
    },

    search: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        marginLeft: 'auto',
    },
});

export default HomeScreen;