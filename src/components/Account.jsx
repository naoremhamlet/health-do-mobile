import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import TopHeader from './TopHeader';
import { COLORS, SIZES, image } from '../constants';
import { AddressPopup } from './Popup/AddressPopup';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount } from '../store/reducer/account';
// import { MyAddresssPopup } from './Popup/MyAddressPopup';

const Detail = ({detail}) => {
  return (
    <View style={styles.detailContainer}>
      <View style={styles.imgContainer}>
        <Image source={image.avatar} style={styles.detailImg} />
        <Pressable>
          <MaterialCommunityIcons name='upload' color="black" size={24} style={styles.upload}  />
        </Pressable>
      </View>
      <View style={styles.detailDetails}>
        <Text style={styles.detailName}>{detail.name}</Text>
        <Text style={styles.detailText}>{detail.phone}</Text>
        <Text style={styles.detailText}>{detail.email}</Text>
        <Text style={styles.detailText}>{detail.address}</Text>
      </View>
    </View>
  )
}

const RectangleItem = ({name, press}) => {
  return (
    <TouchableOpacity style={styles.rectangleContainer} onPress={press}>
      <Text style={styles.rectangleText}>{name}</Text>
      <Octicons name='chevron-right' size={24} color="black" />
    </TouchableOpacity>
  )
}

export default function Account({ navigation }) {

  const [active, setActive] = useState()

  const detail = useSelector(state => state.account.detail)
  const dispatch = useDispatch()

  useEffect(() => {
    const accountDetail = {
      name: "Naorem Hemlet Singh",
      phone: "+91 9366309563",
      email: "naoremhamlet@gmail.com",
      address: "Nambol Naorem, Near Community Hall"
    }

    dispatch(updateAccount({id: 1, detail: accountDetail}))
  }, [])

  if(active==="EditAccountAddress")
    return <AddressPopup 
              closePopup={()=> setActive()} 
              type={"Edit Profile"}
              isEmail={true} />
  // else if (active==="MyAddress")
  //   return <MyAddresssPopup 
  //             closePopup={()=> setActive()}
  //           />
  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="Account" goto={() => navigation.goBack()} />
      <View style={styles.editContainer}>
        <Text style={{fontSize: 13, fontWeight:600}}>Personal Details</Text> 
        <TouchableOpacity onPress={() => setActive("EditAccountAddress")}>
          <FontAwesome5 name="edit" size={20} color="black" />
        </TouchableOpacity> 
      </View>
      <Detail detail={detail} />
      <RectangleItem name={"Orders"} press={() => navigation.navigate("Orders")} />
      <RectangleItem name={"Favourites"} />
      <RectangleItem name={"FAQ"} />
      <RectangleItem name={"Help"} />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 35
  },
  detailContainer: {
    height: 200,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    display: 'flex',
    justifyContent: 'center',
    padding: 17,
    flexDirection: 'row'
  },
  imgContainer: {
    position: 'relative',
    borderRadius: 20,
    width: 90,
  },
  detailImg: {
    height: 100,
    width: 90,
    borderRadius: 10
  },
  upload: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  detailDetails: {
    padding: 10,
    width: '70%',
  },
  detailName: {
    fontSize: SIZES.medium,
    fontWeight: 900
  },
  detailText: {
    fontSize: 13,
    borderBottomWidth: 0.5,
    paddingVertical: 2,
    opacity: 0.5
  },

  rectangleContainer: {
    height: 60,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingHorizontal: 25
  },
  rectangleText: {
    fontSize: SIZES.medium,
    fontWeight: 900
  },
  editContainer: {
    display:'flex',
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 30
  }
})