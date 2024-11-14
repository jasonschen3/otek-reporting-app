import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_IP } from "../constants";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BACKEND_IP}/loginMobile`, {
        username,
        password,
      });
      if (response.status === 200) {
        const { token, engineer_id } = response.data;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("engineer_id", String(engineer_id));
        navigation.navigate("Home");
      }
    } catch (error) {
      Alert.alert("Invalid credentials", error.message || "An error occurred");
      console.log("Error ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Otek Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Login" onPress={handleLogin} color="#6200EE" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#e0f7fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#6200EE",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
  },
});

export default LoginPage;
