import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { db } from "../../lib/base/base";
import { getDoc, doc } from "@firebase/firestore";
import { TouchableOpacity } from "react-native";

const SingleScreen = ({ navigation, route }) => {
  const { categoryId, movieID } = route.params;

  const [item, setItem] = useState([]);

  // console.log(movieID);
  useEffect(() => {
    const docRef = doc(db, "movies", categoryId);
    getDoc(docRef).then((doc) => {
      const movieList = doc.data().movies;
      const newMovie = movieList.find((mov) => {
        return mov.id === movieID;
      });

      setItem(newMovie);
      //console.log(newMovie);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.img} source={{ uri: item.largeImg }} />
      <Text> {item.title}</Text>
      <Text> {item.movieUrl}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Player", {
            categoryId: categoryId,
            movieID: movieID,
          })
        }
      >
        <Text> Play</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SingleScreen;

const styles = StyleSheet.create({
  img: {
    width: "100%",

    resizeMode: "cover",

    margin: 3,
    aspectRatio: 16 / 9,
  },
});
