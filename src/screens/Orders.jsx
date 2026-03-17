// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import TopHeader from '../components/TopHeader'
// import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
// import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
// import CustomButton from '../components/CustomButton'
// import { COLORS, SIZES, image } from '../constants'
// import { TouchableOpacity } from 'react-native-gesture-handler'


// const Item = () => {
//   return (
//     <TouchableHighlight
//       style={styles.itemContent}
//     >
//       <View style={styles.itemContainer}>
//         <View style={styles.itemTop}>
//           <Image source={image.item1} style={styles.item} />
//           <View>
//             <View>
//               <Text style={styles.title}>Vegetable Mix Omlete</Text>
//               <Text style={styles.price}>Rs 160</Text>
//             </View>
//           </View>
//           <Text style={styles.quantity}> X {"4"}</Text>
//         </View>
//         <View style={styles.itemBottom}>
//           <TouchableOpacity style={styles.bottomButton}>
//             <Text style={styles.button}>Order Status</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.bottomButton}>
//             <Text style={styles.button}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//     </TouchableHighlight>
//   )
// }

// // const data = [{id: 1, quantity: 1}, {id: 2, quantity: 3},{id: 3, quantity: 1}, {id: 4, quantity: 3},{id: 5, quantity: 1}, {id: 6, quantity: 3},{id: 7, quantity: 1}, {id: 8, quantity: 3},{id: 9, quantity: 1}, {id: 10, quantity: 3}]
// const data = [{ id: 1, quantity: 1 }, { id: 2, quantity: 3 }]

// export default function Orders({ navigation }) {
//   return (
//     <SafeAreaView style={styles.container}>
//       <TopHeader title="Orders" goto={() => navigation.goBack()} />
//       <Item />

//       {/* <CustomButton title="Checkout" goto={() => navigation.navigate("Checkout")} /> */}
//     </SafeAreaView>
//   )
// }


// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 50,
//     paddingHorizontal: 35,
//     flex: 1,
//   },
//   itemContent: {
//     backgroundColor: COLORS.white,
//     justifyContent: 'center',
//     borderRadius: 20,
//     position: 'relative',
//     height: 150
//   },
//   itemContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   itemTop: {
//     display: 'flex',
//     flexDirection: 'row'
//   },
//   item: {
//     height: 70,
//     width: 70,
//     marginHorizontal: 20
//   },
//   title: {
//     fontSize: SIZES.small,
//     fontWeight: 900
//   },
//   price: {
//     fontSize: SIZES.xSmall,
//     fontWeight: 900,
//     color: COLORS.primary
//   },
//   quantity: {
//     fontSize: SIZES.medium,
//     fontWeight: 600,
//     marginHorizontal: 20
//   },
//   itemBottom: {
//     width: '50%',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     display: 'flex'
//   },
//   bottomButton: {
//     backgroundColor: COLORS.red,
//     borderRadius: 5,
//     paddingVertical: 5,
//     paddingHorizontal: 20
//   },
//   button: {
    
//   }
// })


import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import TopHeader from '../components/TopHeader'
import { COLORS, SIZES, image } from '../constants'

// Sample data for orders
const data = [
  { id: 1, name: 'Vegetable Mix Omlete', price: 160, quantity: 4, image: image.item1 },
  { id: 2, name: 'Sample Item', price: 120, quantity: 2, image: image.item1 }, // Add more items as needed
]

const OrderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemTop}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>Rs {item.price}</Text>
      </View>
      <Text style={styles.quantity}>X {item.quantity}</Text>
    </View>
    <View style={styles.itemBottom}>
      <TouchableOpacity style={styles.bottomButton}>
        <Text style={styles.buttonText}>Order Status</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomButton}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
)

export default function Orders({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TopHeader title="Orders" goto={() => navigation.goBack()} />

      {/* Render list of order items */}
      {data.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}

      {/* Uncomment if you want a checkout button */}
      {/* <CustomButton title="Checkout" goto={() => navigation.navigate("Checkout")} /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    elevation: 2, // Shadow for Android
  },
  itemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemImage: {
    height: 70,
    width: 70,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: SIZES.small,
    fontWeight: '900',
  },
  price: {
    fontSize: SIZES.xSmall,
    fontWeight: '900',
    color: COLORS.primary,
    marginTop: 5,
  },
  quantity: {
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
  itemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  bottomButton: {
    backgroundColor: COLORS.red,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
});