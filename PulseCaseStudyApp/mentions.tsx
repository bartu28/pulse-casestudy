import React, { Component } from "react";
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import Editor, { EU } from "react-native-mentions-editor";

// Styles
import { mentionStyles } from "./ChatScreenStyles";

const users = [
  { id: 1, name: "Raza Dar", username: "mrazadar", gender: "male" },
  { id: 3, name: "Atif Rashid", username: "atif.rashid", gender: "male" },
  { id: 4, name: "Peter Pan", username: "peter.pan", gender: "male" },
  { id: 5, name: "John Doe", username: "john.doe", gender: "male" },
  { id: 6, name: "Meesha Shafi", username: "meesha.shafi", gender: "female" },
];

const formatMentionNode = (txt, key) => (
  <Text key={key} style={mentionStyles.mention}>
    {txt}
  </Text>
);
interface IProps {}

interface IState {
  initialValue?: string;
  message?: string;
  messages: string[];
  showEditor: boolean;
  clearInput: boolean;
  showMentions: boolean;
}
class ChatScreen extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      initialValue: "",
      showEditor: true,
      message: null,
      messages: [],
      clearInput: false,
      showMentions:
        false /**use this parameter to programmatically trigger the mentionsList */,
    };
  }
  onChangeHandler = (message) => {
    /**
     * this callback will be called whenever input value change and will have
     * formatted value for mentioned syntax
     * @message : {text: 'Hey @(mrazadar)(id:1) this is good work.', displayText: `Hey @mrazadar this is good work`}
     * */

    this.setState({
      message,
      clearInput: false,
    });
  };
  sendMessage = () => {
    if (!this.state.message) return;
    const messages = [this.state.message, ...this.state.messages];
    this.setState({
      messages,
      message: null,
      clearInput: true,
    });
  };

  toggleEditor = () => {
    /**
     * This callback will be called
     * once user left the input field.
     * This will handle blur event.
     */
    // this.setState({
    //   showEditor: false,
    // })
  };

  onHideMentions = () => {
    /**
     * This callback will be called
     * When MentionsList hide due to any user change
     */
    this.setState({
      showMentions: false,
    });
  };

  render() {
    return (
      <View>
        <Editor
          editorStyles={{
            mainContainer: styles.textinput,
          }}
          list={users}
          initialValue={this.state.initialValue}
          clearInput={this.state.clearInput}
          onChange={this.onChangeHandler}
          showEditor={this.state.showEditor}
          toggleEditor={this.toggleEditor}
          showMentions={this.state.showMentions}
          onHideMentions={this.onHideMentions}
          placeholder="You can write here..."
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textinput: {
    alignSelf: "center",
    width: "95%",
    height: 70,
    borderColor: "black",
    backgroundColor: "#ffffffd5",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
});

export default ChatScreen;
