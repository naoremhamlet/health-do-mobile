import React, { useState, useRef } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { COLORS } from '../constants';
import HorizonatalProduct from './HorizonatalProduct';


export default function SwipeProduct({ data, buttons }) {
    const [listData, setListData] = useState(data);

    const renderItem = ({item}) => ( 
        <Animated.View style={{height: 120}}>
            <HorizonatalProduct item={item} />
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={styles.backRightBtn}>
                {
                    buttons.map((btn, id) => (
                        <Pressable onPress={btn.function} key={id}>
                            <View style={styles.buttonIcon}>
                                {btn.icon}
                            </View>
                        </Pressable>
                    ))
                }
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <SwipeListView
                disableRightSwipe
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-140}
                useNativeDriver={false}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        marginTop: 50
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        display: 'flex',
        flexDirection: 'row'
    },
    buttonIcon: {
        width: 45,
        height: 45,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 17
    }
});