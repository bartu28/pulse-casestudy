import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MoodSlider from "./Components/MoodRater";

//sqlite frontend
import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import * as SQLite from "expo-sqlite";

//mention demo with bug
import ChatScreen from "./mentions";

const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("db");

module.exports = defaultConfig;

const db = SQLite.openDatabase("db_moods");

db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
  console.log("Foreign keys turned on")
);

const App = () => {
  const [mood, setMood] = useState("");
  const [moodlevel, setMoodlevel] = useState(0);
  const [moods, setMoods] = useState([]);

  const createTables = () => {
    db.transaction((txn) => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS moods (id INTEGER PRIMARY KEY AUTOINCREMENT, mood VARCHAR(100), moodlevel INT)",
        [],
        (sqlTxn: SQLTransaction, res: SQLResultSet) => {
          console.log("table created successfully...");
        }
      );
    });
  };

  const addMood = () => {
    if (!mood) {
      console.log("enter mood and moodlevel");
      return false;
    }
    console.log("moodlevel and mood are present.");
    db.transaction((txn) => {
      txn.executeSql(
        "INSERT INTO moods (mood,moodlevel) VALUES (?,?)",
        [mood, moodlevel],
        (sqlTxn: SQLTransaction, res: SQLResultSet) => {
          console.log(
            "Mood:" +
              { mood } +
              " Mood Level:" +
              { moodlevel } +
              " mood added..."
          );
          getMoods();
          setMood("");
        }
      );
    });
  };

  const getMoods = () => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT * FROM moods ORDER BY id DESC",
        [],
        (sqlTxn: SQLTransaction, res: SQLResultSet) => {
          let len = res.rows.length;
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({
                id: item.id,
                mood: item.mood,
                moodlevel: item.moodlevel,
              });
            }

            setMoods(results);
          }
        }
      );
    });
  };
  useEffect(() => {
    async function check() {
      await createTables();
      await getMoods();
    }
    check();
  }, []);

  const renderMoods = ({ item }) => {
    return (
      <View>
        <TouchableOpacity style={styles.moodCard}>
          <Text style={{ color: "white" }}>
            Id:{item.id} Mood level: {item.moodlevel}
          </Text>
          <Text style={{ color: "white" }}>Description:</Text>
          <Text style={{ color: "white" }}>{item.mood}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  function childToParent(data) {
    setMoodlevel(data);
  }
  return (
    <View style={{ flex: 1 }}>
      <Text></Text>
      <LinearGradient
        // Button Linear Gradient
        colors={["#000000", "#ffffff"]}
      >
        <Text style={styles.subHeader}>Share</Text>

        <Text></Text>
        <Text></Text>
        <Text></Text>
        {/*<ChatScreen></ChatScreen>*/}
        <Text></Text>
        <Text></Text>
        <Text></Text>

        <TextInput
          multiline
          maxLength={94}
          numberOfLines={2}
          placeholder="Enter Mood"
          value={mood}
          onChangeText={setMood}
          style={styles.textinput}
        />
        <Text></Text>
        <Text></Text>
      </LinearGradient>
      <Text></Text>
      <Text></Text>

      <MoodSlider childToParent={childToParent} data="naber" />
      <Text></Text>
      <Text></Text>

      <Text></Text>
      <Pressable style={styles.pressable} onPress={addMood}>
        <Text style={styles.buttontext}>Add Mood</Text>
      </Pressable>
      <Text
        style={{
          paddingLeft: 20,
          paddingVertical: 0,
        }}
      >
        Shared Moods:
      </Text>
      <FlatList
        style={styles.moodCards}
        data={moods}
        renderItem={renderMoods}
        keyExtractor={(a) => a.id}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    //backgroundColor: "black",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    fontSize: 40,
    marginBottom: 10,
  },
  buttontext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  pressable: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: "50%",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  textinput: {
    alignSelf: "center",
    width: "95%",
    borderColor: "black",
    backgroundColor: "#ffffffd5",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  moodCard: {
    alignSelf: "center",
    width: "95%",
    borderColor: "black",
    backgroundColor: "#252525",
    borderWidth: 1,
    marginVertical: 3,
    borderRadius: 4,
  },
  moodCards: {
    alignSelf: "center",
    width: "95%",
    heigh: "100%",
  },
});
export default App;
