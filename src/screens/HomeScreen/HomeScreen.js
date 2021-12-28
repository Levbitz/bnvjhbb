import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { auth, db } from "../../lib/base/base";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "@firebase/firestore";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import cati from "../../lib/base/cati";
import HomeCategory from "../../lib/HomeCategory/HomeCategory";

const HomeScreen = ({ navigation }) => {
  const user = auth.currentUser;
  //console.log(user);
  const [myMovies, setMyMovies] = useState([]);

  const colRef = collection(db, "movies");

  const q = query(colRef, orderBy("createdAt", "asc"));

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setMyMovies(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  //console.log(myMovies);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Text> Welcome to {auth.currentUser.email} Home Page</Text>

      <FlatList
        data={myMovies}
        keyExtractor={myMovies.id}
        renderItem={({ item }) => {
          return (
            <>
              <HomeCategory category={item} navigation={navigation} />
            </>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
