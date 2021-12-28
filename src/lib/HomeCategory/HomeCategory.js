import React from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const HomeCategory = ({ category, navigation }) => {
  return (
    <>
      <Text key={category.data.title} style={styles.catTitle}>
        {category.data.title}
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={category.data.movies}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              key={item.small_img}
              onPress={() =>
                navigation.navigate("Single", {
                  image: item.small_img,
                  title: "samuel",
                  categoryId: category.id,
                  movieID: item.id,
                })
              }
            >
              <Image
                transition={false}
                style={styles.img}
                source={{
                  uri: item.small_img,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default HomeCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 30,
  },
  img: {
    width: 110,
    height: 160,
    resizeMode: "cover",
    borderRadius: 10,
    margin: 3,
  },
  catTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "5%",
  },
});
