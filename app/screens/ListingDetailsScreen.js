import React from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import ContactSellerForm from "../components/ContactSellerForm";

function ListingDetailsScreen({ route }) {
  const listings = route.params;
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <Image
        style={styles.image}
        preview={{ uri: listings.images[0].thumbnailUrl }}
        tint="light"
        uri={listings.images[0].url}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listings.title}</Text>
        <Text style={styles.price}>${listings.price}</Text>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/stylish_man.jpg")}
            title="Alex"
            subTitle="5 Listings"
          />
        </View>
        <ContactSellerForm listing={listings} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
