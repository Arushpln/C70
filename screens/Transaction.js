import React, { Component } from "react";
import { View,
   Text, 
   StyleSheet,
    TouchableOpacity,
  TextInput,
ImageBackground,
Image

  } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

const bgImage = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");
const appName = require("../assets/appName.png");

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: ""
    };
  }

  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scannedData: data,
      domState: "normal",
      scanned: true
    });
  };

  render() {
    const { bookId, studentId, domState, scanned } = this.state;
    
    const {  hasCameraPermissions, scannedData} = this.state;
    if (domState === "scanner") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    return (
      <View style={styles.container}>
        <ImageBackground source = {bgImage} style = {styles.bgImage}>
          <View style = { styles.upperContainer   }>
            <Image source = {appIcon} style = {styles.appIcon}/>
            <Image source = {appName} style = {styles.appName}/>
          </View>
   
   <View style = {styles.lowerContainer}>
    <View style = {styles.textInputContainer}>
      <TextInput
      style = {styles.textInput}
      placeHolder = {"BookId"}
      placeHolderTextColor = {"#ffffff"}
      value = {BookId}
      />
      <TextInput
      style = {styles.textInput}
      placeHolder = {"StudentId"}
      placeHolderTextColor = {"#ffffff"}
      value = {StudentId}
      />

      
    </View>
   </View>
    

<Text style={styles.text}>
          {hasCameraPermissions ? scannedData : "Request for Camera Permission"}
        </Text>
        <TouchableOpacity
          style={[styles.button, { marginTop: 25 }]}
          onPress={() => this.getCameraPermissions("scanner")}
        >
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 15
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 15
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF"
  }
});