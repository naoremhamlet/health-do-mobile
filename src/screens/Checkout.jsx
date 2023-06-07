import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopHeader from '../components/TopHeader'
import CustomButton from '../components/CustomButton'
import { SIZES } from '../constants'
import { Delivery } from '../components/Delivery'
import { Payment } from '../components/Payment'
import { PaymentPopup } from '../components/Popup/PaymentPopup'
import { DeliveryPopup } from '../components/Popup/DeliveryPopup'



export default function Checkout({ navigation }) {
  const [active, setActive] = useState("Delivery")
  const [notifyPaymentPopup, setNotifyPaymentPopup] = useState(false)
  const [editAddressPopup, setEditAddressPopup] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
        <TopHeader title="Checkout" 
          goto={() => {
            if(active === "Delivery")
              return navigation.goBack()
            else
              return setActive("Delivery")
          }} />

        {active ==="Delivery" && <Delivery editAddress={()=> setEditAddressPopup(true)} />}
        {active ==="Payment" && <Payment />}
        {notifyPaymentPopup && <PaymentPopup closePopup={() => setNotifyPaymentPopup(false)} />}
        {editAddressPopup && <DeliveryPopup closePopup={() => setEditAddressPopup(false)} />}
        
        <View style={styles.total}>
            <Text style={{ fontSize: SIZES.medium, fontWeight: 400}}>Total</Text>
            <Text style={{ fontSize: SIZES.large, fontWeight: 900}}>Rs 1560</Text>
        </View>

        <CustomButton 
          title={active==="Delivery"? "Payment" : "Proceed to Payment"} 
          goto={() => {
            if(active === "Delivery")
              return setActive("Payment")
            else
              setNotifyPaymentPopup(true)
          }} />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 35,
    },
    total: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center'
    }
})