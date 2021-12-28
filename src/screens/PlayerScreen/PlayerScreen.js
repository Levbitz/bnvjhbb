import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { db } from "../../lib/base/base";
import { getDoc, doc } from "@firebase/firestore";
import { Video, AVPlaybackStatus } from "expo-av";

const PlayerScreen = ({ route, navigation }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const { image, title, catType, categoryId, movieID } = route.params;

  const [item, setItem] = useState([]);

  useEffect(() => {
    const docRef = doc(db, "movies", categoryId);
    getDoc(docRef).then((doc) => {
      const movieList = doc.data().movies;
      const newMovie = movieList.find((mov) => {
        return mov.id === movieID;
      });

      setItem(newMovie);
      // console.log(newMovie.movieUrl);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={{ width: 300, height: 200 }}
        source={{
          uri: item.movieUrl,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>

      <Text>{categoryId}</Text>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({});
