import { StyleSheet, View, Modal, TouchableOpacity, Dimensions, Alert, Pressable, Image } from 'react-native'
import React from 'react'
import { colors } from '../../../constants/colors'
import { Text } from '@tonkeeper/uikit'

const { width, height } = Dimensions.get('window')

type Props = {
    title: string,
    subtitle: string,
    isVisible: boolean,
    onClose: () => void
}

const ModalReferral = (props: Props) => {
    const { title, subtitle, onClose, isVisible } = props;
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType='slide'
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');

            }}
        >
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>

                <Pressable style={[styles.modalContainer]} onPress={onClose}>
                </Pressable>
                <View style={[styles.inerModal]}>
                    <Image style={[styles.img]} source={ title === 'Success' ? require('../../../assets/logo/img_success.png') :require('../../../assets/logo/img_warning.png')} />
                    <Text style = {{color: title === 'Success' ? colors.Green : colors.Red}}  type='h3' fontSize={25} textAlign='center'>{title}</Text>
                    <Text color='textBlack' type='body2' fontSize={16} textAlign='center' style={{ marginTop: 10 }}>{subtitle}</Text>
                    <TouchableOpacity style={[styles.btnClose]} onPress={onClose}>
                        <Text color='primaryColor' type='h3' fontSize={16} textAlign='center'>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    )
}

export default ModalReferral

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(1,1,1,0.5)",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    inerModal: {
        width: width * 0.75,
        backgroundColor: colors.White,
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',

    },
    btnClose: {
        width: width * 0.3,
        height: 44,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
        borderWidth: 2,
        borderColor: colors.Primary
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 30
    }
})