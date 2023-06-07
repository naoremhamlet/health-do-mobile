import React from 'react'
import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity } from 'react-native'
import { COLORS, SIZES } from '../../constants'

const BodyItem = ({ title, content }) => {
    return (
        <View style={styles.bodyItem}>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemContent}>{content}</Text>
        </View>
    )
}


const PopupButton = ({title, func, style, color}) => {
    return(
        <TouchableOpacity style={style} onPress={func}>
            <Text style={{ color: color, ...styles.buttonText}}>{title}</Text>
        </TouchableOpacity>
    )
}


export const PaymentPopup = ({closePopup}) => {
    return (
        <Modal
          transparent={true}
          animationType='fade'>
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.header}>Please Note</Text>
                    </View>
                    <View style={styles.body}>
                        <BodyItem title="DELIVERY TO IMPHAL" content="Rs 50 - Rs 100" />
                        <BodyItem title="DELIVERY OUTSIDE IMPHAL" content="Rs 100 - Rs 150" />
                    </View>
                    <View style={styles.bottom}>
                        <PopupButton
                            key={9}
                            title="Cancel"
                            style={styles.cancelButton}
                            color={COLORS.tertiary}
                            func={closePopup}
                        />
                        <PopupButton
                            key={10}
                            title="Confirm"
                            style={styles.confirmButton}
                            color={COLORS.white}
                            func={closePopup}
                        />
                    </View>
                    {/* <View style={{ display: 'flex', flexDirection:"row", justifyContent:'space-between'}}>
                        <Button onPress={closePopup} title='Cancel' />
                        <Button onPress={closePopup} title='Confirm' />
                    </View> */}
                    {/* <View style={styles.bottom}>
                        <PopupButton
                            key={9}
                            title="Cancel"
                            style={styles.cancelButton}
                            color={COLORS.tertiary}
                            func={closePopup}
                        />
                        <PopupButton
                            key={10}
                            title="Confirm"
                            style={styles.confirmButton}
                            color={COLORS.white}
                            func={closePopup}
                        />
                    </View> */}
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent:'center',
        backgroundColor: COLORS.wrapper,
    },
    container: {
        minHeight: 340, 
        backgroundColor: COLORS.white, 
        marginHorizontal: 35, 
        borderRadius: 30,
        elevation: 5
    },
    heading: {
        backgroundColor:COLORS.background,
        paddingVertical: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    header: {
        paddingHorizontal: 35,
        fontSize: 15,
        fontWeight: 600
    },
    body: {
        marginHorizontal: 35,
        marginBottom: 90,
    },
    bodyItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        opacity: 0.5
    },
    itemTitle: {
        fontSize: 14
    },
    itemContent: {
        opacity: 1,
        fontSize: SIZES.medium,
        fontWeight: 600
    },
    bottom: {
        paddingHorizontal: 35,
        paddingVertical: 25,
        display: 'flex', 
        flexDirection:"row", 
        justifyContent:'space-between',
        position:'absolute',
        bottom: 0,
        width: '100%'
    },
    confirmButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 20,
        paddingHorizontal: 45,
        borderRadius: 30
    },
    cancelButton: {
        paddingVertical: 20,
    },
    buttonText: {
        fontSize: SIZES.medium,
        fontWeight: 600
    }
})