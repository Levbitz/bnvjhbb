import { StatusBar } from "expo-status-bar";

import React, { useEffect, useState } from "react";

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { auth } from "../../lib/base/base";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { globalStyles } from "../../lib/GlobalStyles/GlobalStyles";
import { Entypo } from "@expo/vector-icons";

// import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // console.log(authUser);
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  //handle signin
  const Signin = () => {
    //navigation.replace("Home");
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error)
    );
  };
  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <StatusBar style="light" />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 50,
          marginHorizontal: 0,
          paddingTop: 0,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 25,
              color: "#fff",
              fontWeight: "600",
              marginRight: "25%",
            }}
          >
            άπειρο
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                fontWeight: "300",
                marginLeft: 80,
                borderColor: "#fff",
                borderWidth: 0.5,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 5,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Input
          style={globalStyles.input}
          placeholder="email ID"
          autoFocus
          type="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          style={globalStyles.input}
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={Signin}
          icon={{}}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          containerStyle={styles.button}
          buttonStyle={{
            backgroundColor: "red",
          }}
          title="Login"
          onPress={Signin}
        />
      </View>

      <Button
        containerStyle={styles.button}
        type="outline"
        title="Forgot Passoword"
        onPress={() => navigation.replace("PasswordReset")}
      />
      <View style={{ height: 0 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#000",
    paddingTop: 35,
  },
  inputContainer: {
    width: "90%",
  },
  button: {
    width: "80%",
    marginHorizontal: "5%",
    marginTop: 10,
  },
});
