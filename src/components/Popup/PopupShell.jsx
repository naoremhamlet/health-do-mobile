import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Pressable,
    StyleSheet,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../../constants';

/**
 * Shared bottom-sheet shell used by every popup in the app (Address, Delivery,
 * Payment, Order Details, Sort/Filter). Keeping the chrome — overlay, knob,
 * header, footer buttons — in one place means every popup looks and behaves
 * the same, and stays that way as the app grows.
 *
 * Callers supply only their specific body content as children, plus the
 * title/actions they need.
 */
export default function PopupShell({
    visible = true,
    onClose,
    title,
    subtitle,
    titleAccessory,
    children,
    scrollable = true,
    maxHeight = '88%',
    minHeight,
    primaryAction,     // { label, onPress, tone: 'primary' | 'dark', disabled }
    secondaryAction,   // { label, onPress }
    footer,            // fully custom footer node — overrides primary/secondaryAction
    contentContainerStyle,
}) {
    const hasFooter = footer !== undefined || primaryAction || secondaryAction;

    const body = scrollable ? (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.bodyScrollContent, contentContainerStyle]}
        >
            {children}
        </ScrollView>
    ) : (
        <View style={[styles.bodyStatic, contentContainerStyle]}>
            {children}
        </View>
    );

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Pressable style={styles.overlay} onPress={onClose}>
                    <Pressable style={[styles.sheet, { maxHeight, minHeight }]} onPress={() => {}}>
                        <View style={styles.knob} />

                        <View style={styles.header}>
                            <View style={styles.titleBlock}>
                                <Text style={styles.title}>{title}</Text>
                                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                            </View>
                            <View style={styles.headerActions}>
                                {titleAccessory}
                                {onClose && (
                                    <TouchableOpacity onPress={onClose} style={styles.closeBtn} hitSlop={8}>
                                        <Entypo name="cross" size={20} color={COLORS.black} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                        {body}

                        {hasFooter && (
                            footer !== undefined ? footer : (
                                <View style={styles.footer}>
                                    {secondaryAction && (
                                        <TouchableOpacity
                                            style={styles.secondaryBtn}
                                            onPress={secondaryAction.onPress}
                                            activeOpacity={0.7}
                                        >
                                            <Text style={styles.secondaryBtnText}>{secondaryAction.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                    {primaryAction && (
                                        <TouchableOpacity
                                            style={[
                                                styles.primaryBtn,
                                                primaryAction.tone === 'dark' && { backgroundColor: COLORS.black },
                                                primaryAction.disabled && { opacity: 0.5 },
                                            ]}
                                            onPress={primaryAction.onPress}
                                            disabled={primaryAction.disabled}
                                            activeOpacity={0.85}
                                        >
                                            <Text style={styles.primaryBtnText}>{primaryAction.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )
                        )}
                    </Pressable>
                </Pressable>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingTop: 12,
        overflow: 'hidden',
    },
    knob: {
        width: 40,
        height: 5,
        borderRadius: 3,
        backgroundColor: COLORS.gray2,
        alignSelf: 'center',
        marginBottom: 18,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 25,
        marginBottom: 18,
    },
    titleBlock: {
        flex: 1,
        paddingRight: 15,
    },
    title: {
        fontSize: 19,
        fontWeight: '900',
        color: COLORS.black,
    },
    subtitle: {
        fontSize: 12,
        color: COLORS.gray2,
        marginTop: 3,
        fontWeight: '600',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    closeBtn: {
        backgroundColor: COLORS.lightWhite,
        padding: 7,
        borderRadius: 20,
    },
    bodyScrollContent: {
        paddingHorizontal: 25,
        paddingBottom: 10,
    },
    bodyStatic: {
        paddingHorizontal: 25,
    },
    footer: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 25,
        paddingTop: 15,
        paddingBottom: Platform.OS === 'ios' ? 40 : 25,
        borderTopWidth: 1,
        borderTopColor: COLORS.divider,
    },
    primaryBtn: {
        flex: 1,
        backgroundColor: COLORS.primary,
        borderRadius: 18,
        paddingVertical: 16,
        alignItems: 'center',
        ...SHADOWS.small,
    },
    primaryBtnText: {
        color: COLORS.white,
        fontWeight: '900',
        fontSize: 15,
    },
    secondaryBtn: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryBtnText: {
        color: COLORS.gray,
        fontWeight: '800',
        fontSize: 15,
    },
});
