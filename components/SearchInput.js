import React, { Component } from "react";
import { TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class SearchInput extends Component {
  state = {
    text: ""
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  };

  static defaultProps = {
    placeholder: ""
  };

  onChangeTextHandler = text => this.setState({ text });
  onSubmitHandler = () => {
    const { text } = this.state;
    if (!text) return;
    const { onSubmit } = this.props;

    onSubmit(text);
    this.setState({ text: "" });
  };

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;
    return (
      <TextInput
        autoCorrect={false}
        clearButtonMode="always"
        onChangeText={this.onChangeTextHandler}
        underlineColorAndroid="transparent"
        style={styles.textInput}
        placeholder={placeholder}
        onSubmitEditing={this.onSubmitHandler}
        value={text}
        placeholderTextColor="white"
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    width: 300,
    backgroundColor: "#666",
    height: 40,
    paddingHorizontal: 10,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 5,
    color: "white",
    alignSelf: "center"
  }
});
