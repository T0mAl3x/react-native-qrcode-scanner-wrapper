/* eslint-disable react-native/no-inline-styles */
import React, { FC, useRef, useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import { FAB } from 'react-native-paper'
import QRCodeScanner from 'react-native-qrcode-scanner'

type ScannerProps = {
  headerTitle?: string
  reactivateTitle?: string
  onRead: (data: string) => void
}

const defaultProps = {
  headerTitle: 'Scan QR Code',
  reactivateTitle: 'Reactivate Scanner',
}

const Scanner: FC<ScannerProps> = (props: ScannerProps) => {
  const { headerTitle, reactivateTitle, onRead } = props
  const [cameraType, toggleCameraType] = useState<'front' | 'back'>('back')
  const scannerRef = useRef<QRCodeScanner>(null)

  const renderCustomMarker = () => {
    return (
      <View style={styles.customMarker}>
        <View style={styles.resultContainer}>
          <Text style={{ color: '#0ABB87' }}>{headerTitle}</Text>
          <FAB
            style={styles.resetBtn}
            small
            icon='reload'
            onPress={() => {
              if (cameraType === 'back') {
                toggleCameraType('front')
              } else {
                toggleCameraType('back')
              }
            }}
          />
        </View>

        <View style={styles.markerActionsContainer}>
          <TouchableOpacity
            style={{ ...styles.actionBtn, backgroundColor: '#0ABB87' }}
            onPress={() => {
              if (scannerRef && scannerRef.current) {
                scannerRef.current.reactivate()
              }
            }}
          >
            <Text style={{ color: 'white' }}>{reactivateTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.rootContainer}>
      <QRCodeScanner
        ref={scannerRef}
        onRead={(e) => {
          onRead(e.data)
        }}
        cameraStyle={styles.cameraContainer}
        cameraProps={{
          barCodeTypes: [RNCamera.Constants.BarCodeType.qr],
        }}
        cameraType={cameraType}
        topViewStyle={styles.zeroContainer}
        bottomViewStyle={styles.zeroContainer}
        customMarker={renderCustomMarker()}
        showMarker
      />
    </View>
  )
}
Scanner.defaultProps = defaultProps

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  customMarker: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  resultContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerActionsContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    backgroundColor: '#5d78ff',
    height: 40,
    flex: 1,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetBtn: {
    position: 'absolute',
    margin: 16,
    right: 0,
    backgroundColor: '#009EF7',
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  cameraContainer: {
    height: Dimensions.get('screen').height,
  },
})

export default Scanner
