    import { View, Text, Image, FlatList, StyleSheet, TouchableHighlight, TextInput, ScrollView } from 'react-native';

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
        const navigation = useNavigation();
        const [livres, setLivre] = useState(LIVRES);

        const [categorie] = useState(CATEGORIES);

        livres.sort((a, b) => a.titre.localeCompare(b.titre));

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

        const renderAllCategories = ({ item }) => {
            const capitalizeGenre = capitalizeFirstLetter(item.genre);
            return (
                <View style={styles.containerCategorie}>
                    <Text style={[styles.contentCategorie, { backgroundColor: item.couleur }]}>{capitalizeGenre}</Text>
                </View>
            )
        };

        const renderAllItem = ({ item }) => {
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
                            <Text style={styles.containerLivreTitle}>{truncatedTitle}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        };

        const renderLivresByCategorie = ({ item }) => {
            const livresInCategorie = LIVRES.filter((livre) => livre.categorieId.includes(item.id));

            const truncatedTitle = LIVRES.filter((livre) => livre.categorieId.includes(item.id)).map((livre) => truncateString(livre.titre, 20));

            return (
                <View>
                    <Text style={[styles.titleCategorie, { backgroundColor: item.couleur }]}>
                        {item.genre.toUpperCase()}
                    </Text>
                    <View>
                        {livresInCategorie.map((livre, index) => (
                            <View style={styles.containerLivresByCategories} key={livre.id}>
                                <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => navigation.navigate('Details', { item: livre })}>
                                    <View style={styles.containerLivres}>
                                        <Image source={{ uri: livre.imageUrl }} style={styles.imageLivre} />
                                        <Text style={styles.containerLivreTitle}>{truncatedTitle[index]}</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        ))}
                    </View>
                </View>
            );
        };

        return (
            <FlatList
                data={categorie}
                renderItem={renderLivresByCategorie}
                keyExtractor={(item) => item.id.toString()}
                numColumns={1}
                ListHeaderComponent={
                    <>
                        <TextInput
                            style={styles.search}
                            placeholder='Rechercher un livre par son nom'
                            value={search}
                            onChangeText={handleSearch}
                        />
                        <Text style={styles.tousCategorie}>Toutes les catégories</Text>
                        <FlatList
                            data={categorie}
                            renderItem={renderAllCategories}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal={true}
                        />
                        <View style={styles.tousContainerCategorie}>
                            <Text style={styles.tousCategorie}>Tous les livres</Text>
                        </View>
                        <FlatList
                            data={livres}
                            renderItem={renderAllItem}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                        />
                        <Text style={styles.tousCategorie}>Par catégorie</Text>
                    </>
                }
            />
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
        },

        containerLivresByCategories: {
            width: "100%",
            justifyContent: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row',
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

        tousCategorie: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            backgroundColor: 'black',
        },

        titleCategorie: {
            fontSize: 15,
            color: 'white',
            textAlign: 'center',
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