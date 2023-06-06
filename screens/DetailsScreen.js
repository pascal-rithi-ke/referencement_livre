import { View, Text, Image, FlatList, ScrollView, StyleSheet } from 'react-native';

import { useRoute } from '@react-navigation/native';

import { CATEGORIES } from '../simple_data/data'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function DetailsScreen() {
    const route = useRoute();
    const { item } = route.params;

    const getStatutText = () => {
        if (item.enCours) {
            return 'En cours';
        } else {
            return 'Terminé';
        }
    };

    return (
        <ScrollView style={{ backgroundColor: '#eeee' }}>
            <Image source={{ uri: item.imageUrl }} style={styles.imageLivre} />
            <View style={styles.containerLivre}>

                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{item.titre}</Text>

                <Text style={styles.label_nbTomesLivre}>Nombre de tome(s):</Text>
                <Text style={styles.nbTomesLivre}>{item.tomes} tome(s)</Text>

                <Text style={styles.label_statutLivre}>Statut de la série: </Text>
                <Text style={[styles.statutLivre, getStatutText() === 'Terminé' ? styles.statutLivreTerminer : styles.statutLivreEnCours]}>{getStatutText()}</Text>

                <Text style={styles.label_tagLivre}>Tag(s):</Text>
                <View style={styles.tagLivre}>
                    {item.categorieId.map((categorieId) => {
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
                </View>

                <Text style={styles.label_descriptionLivre}>Synopsis:</Text>
                <View style={styles.container_descriptionLivre}>
                    <Text style={styles.descriptionLivre}>{item.description}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerLivre: {
        margin: 15,
        //padding: 10,
        backgroundColor: '#eeee',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        //width: 350,
        height: 500,
    },

    imageLivre: {
        width: "100%",
        aspectRatio: 1,
        transform: [{ scale: 1 }]
    },

    label_nbTomesLivre: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    nbTomesLivre: {
        margin: 5,
        width: 100,
    },

    label_statutLivre: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    statutLivre: {
        margin: 5,
        width: 100,
    },
    statutLivreTerminer: {
        backgroundColor: 'red',
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        borderRadius: 5,
        textAlign: 'center',
    },
    statutLivreEnCours: {
        backgroundColor: 'green',
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        borderRadius: 5,
        textAlign: 'center',
    },

    label_tagLivre: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    tagLivre: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    contentCategorie: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        borderRadius: 5,
        padding: 5,
        margin: 5,
    },

    label_descriptionLivre: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    container_descriptionLivre: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 5,
    },
    descriptionLivre: {
        fontSize: 15,
        margin: 10,
    },
});

export default DetailsScreen;