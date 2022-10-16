import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { Appbar, Card, Title, Paragraph } from "react-native-paper";
import { doc, onSnapshot, collection, getDocs, getFirestore } from "firebase/firestore";
import {getStorage, ref, getDownloadURL} from "firebase/storage";
import firebase from "firebase/app";
import "firebase/firestore";
import { feedItem } from "../../models/feedItem.js";
import { styles } from "./FeedScreen.styles";
import { StackNavigationProp } from "@react-navigation/stack";

export function FeedScreen({ navigation }) {
  // TODO: Initialize a list of SocialModel objects in state.
  const [myList, setMyList] = useState([]);
  const db = getFirestore();
  /* TYPESCRIPT HINT: 
    When we call useState(), we can define the type of the state
    variable using something like this:
        const [myList, setMyList] = useState<MyModelType[]>([]); */

    useEffect(() => {
      let feedItems = [];
      const q = (collection(db, "feedItems"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const docs: feedItem = {
            foodDate: doc.data().foodDate,
            foodName: doc.data().foodName,
            foodDescription: doc.data().foodDescription,
            foodLink: doc.data().foodLink,
            foodImage: doc.data().foodImage,
          };
            feedItems.push(docs);
        });
        setMyList(feedItems);
        console.log(feedItems);
        feedItems = [];
      });
  
     

      return () => {
        unsubscribe();
      }
  }, [db]);

  function getFormattedDate(date: Date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }

  function formatAMPM(date: Date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ':' + seconds + " " + ampm;
    return strTime;
  }

  const renderItem =   ({ item }: { item: feedItem }) => {
    // TODO: Return a Card corresponding to the social object passed in
    // to this function. On tapping this card, navigate to DetailScreen
    // and pass this ssocial.
    var date = new Date(item.foodDate);
   return (  
    <View 
    style={{
        borderWidth:2,
        borderColor:"#000000",
     padding: 20
    }}
>
   <Card containerStyle = {{borderRadius: 10}}>
   <Card.Cover source={{ uri: item.foodImage }} />
     <Card.Content style={{  padding: 10 }}>
      <Title style={styles.h1}>{item.foodName}</Title>
      <Title style={styles.h2}>{item.foodDescription}</Title>
      <Title style={styles.body}>{item.foodLink}</Title>
      <Paragraph style={styles.body}>{"\u2022 " + getFormattedDate(date) +", " + formatAMPM(date)}</Paragraph>

    </Card.Content>
   
      </Card>
      </View>);
      

  }



  const NavigationBar = () => {
    // TODO: Return an AppBar, with a title & a Plus Action Item that goes to the NewSocialScreen.
    return (
      <Appbar.Header style ={{backgroundColor: "#ffffff"}}>
        <Appbar.Content title="Friend's Food" />
        <Appbar.Action icon="plus" onPress={() => {navigation.navigate('NewFoodScreen')}} />
      </Appbar.Header>
    );
  };

  return (
    <>
      <NavigationBar />
      <View style={{flex: 1, backgroundColor: '#333333'}}>
      <FlatList
        data={myList}
        renderItem={renderItem}
        keyExtractor={item => item.foodName}
      />
      </View>
    </>
  );
}
