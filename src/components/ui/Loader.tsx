import React, { FC } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader: FC<{ loading: boolean }> = ({ loading }) => {
    if (!loading) return null; // Renders nothing if loading is false

    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1000,
    },
});

export default Loader;