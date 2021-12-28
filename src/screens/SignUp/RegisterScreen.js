import React, { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { globalStyles } from "../../lib/GlobalStyles/GlobalStyles";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../../lib/base/base";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        // authUser.user.updateProfile({
        //   displayName: name,
        //   photoURL: "https://apeiroz.com/images/users/2.png",
        // });
      })
      .catch((error) => {
        setName("");
        setEmail("");
        setPassword("");
        // setError(error.code);
        // console.log(error.code);
      });
    // console.log("sam");
    // console.log(auth);
    // createUserWithEmailAndPassword(auth, name, email, password).then((cred) => {
    //   console.log(cred.user);
    // });
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
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
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text h3 style={{ color: "#fff" }}>
        Create Account
      </Text>
      {!!error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.inputContainer}>
        <Input
          style={globalStyles.input}
          placeholder="Full Name"
          autofocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          style={globalStyles.input}
          placeholder="email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          style={globalStyles.input}
          placeholder="password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button
        containerStyle={styles.button}
        buttonStyle={{
          backgroundColor: "red",
        }}
        disabledInputStyle={{ color: "red", opacity: 1 }}
        raised
        disabled={isInvalid}
        title="Register"
        onPress={register}
      />
      <View style={{ height: 5 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

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
  error: {
    backgroundColor: "#e87c03",
    borderRadius: 4,
    fontSize: 14,

    marginHorizontal: 16,
    color: "#fff",
    paddingVertical: 15,
  },
});
