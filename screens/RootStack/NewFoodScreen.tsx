import React, { useState, useEffect } from "react";
import { Platform, View } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { getFileObjectAsync, uuid } from "../../Utils";

// See https://github.com/mmazzarolo/react-native-modal-datetime-picker
// Most of the date picker code is directly sourced from the example.
import DateTimePickerModal from "react-native-modal-datetime-picker";

// See https://docs.expo.io/versions/latest/sdk/imagepicker/
// Most of the image picker code is directly sourced from the example.
import * as ImagePicker from "expo-image-picker";
import { styles } from "./FeedScreen.styles";

import firebase from "firebase/app";
import "firebase/firestore";
import { doc, getFirestore,  setDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, uploadString } from "firebase/storage";
import { feedItem } from "../../models/feedItem.js";
import { StackNavigationProp } from "@react-navigation/stack";


export function NewFoodScreen({ navigation }) {

  const [foodName, setFoodName] = React.useState("");  
  const [visible, setVisible] = React.useState(false);
  const [foodLink, setFoodLink] = React.useState(""); 
  const [foodDescription, setFoodDescription] = React.useState("");
  const [imageButtonText, setImageButtonText] = React.useState("PICK AN IMAGE");
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = useState("");
  const [dateObject, setDateObject] = useState(0);



  function validateFields() {
    if(foodName === "" || foodDescription === "" || foodLink === "" || image === "") {
      return false;
    } 
      return true; 
  }

  const saveEvent = async () => {
    // TODO: Validate all fields (hint: field values should be stored in state variables).
    // If there's a field that is missing data, then return and show an error
    // using the Snackbar.

    // Otherwise, proceed onwards with uploading the image, and then the object.
    let isValid = validateFields();
    
    if(isValid == false) {
      setVisible(true);
      return;
    }

    try {
        validateFields();
        setLoading(true);
        //const object = await getFileObjectAsync(image);
        let date = new Date();
        const response = await fetch(image);
        const object = await response.blob();
        const storage = getStorage();
        const uuidNum:string = uuid();
        const storageRef = ref(storage,  uuidNum + ".jpg");
        const db = getFirestore();
        console.log('Trying to upload');
        //const result = await storage.ref().child(uuid() + ".jpg").put(object as Blob);
        uploadBytes(storageRef, object as Blob).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          getDownloadURL(storageRef).then(async (url) => {
            const docs: feedItem = {
                foodDate: date.getTime(),
                foodName: foodName,
                foodDescription: foodDescription,
                foodLink: foodLink,
                foodImage: url,
            };
            await setDoc(doc(db, "feedItems", uuid()), docs);
            setLoading(false);
            navigation.navigate("FeedScreen");
            console.log("Finished feed creation.");
            
          })
         
        });
        
    

        //const downloadURL = await result.ref.getDownloadURL();

        //await firebase.firestore().collection("socials").doc().set(doc);
        
    

    } catch (e) {
      console.log("Error while writing social:", e);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri);

    setImage(result.uri);
    
    setImageButtonText('CHANGE IMAGE');
  };




 

  const onDismissSnackBar = () => setVisible(false);

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#ffffff', padding: 20 }}>
      <TextInput style={{marginTop: 30, backgroundColor: "#ffffff"}}  label="Food Name" value={foodName} onChangeText={text => setFoodName(text) }/>
      <TextInput style={{marginTop: 16, backgroundColor: "#ffffff"}}  label="Food Link" value={foodLink} onChangeText={text => setFoodLink(text)}/>
      <TextInput style={{marginTop: 16, backgroundColor: "#ffffff"}}  label="Food Description" value={foodDescription} onChangeText={text => setFoodDescription(text)}/>
      <Button style={{marginTop: 20, height: 50, justifyContent: 'center'}} color='#70104a' mode = "outlined" onPress={pickImage}> {imageButtonText} </Button>
      <Button labelStyle={{ color: "white" }} style={{marginTop: 20, height: 50, justifyContent: 'center'}} color='#70104a'  loading = {loading} mode = "contained" onPress={saveEvent}> SAVE EVENT </Button>
    <Snackbar visible={visible} onDismiss={onDismissSnackBar}> Please fill out all fields! </Snackbar>
      </View>
    </>
  );
}
