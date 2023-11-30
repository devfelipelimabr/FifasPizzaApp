import { StyleSheet } from 'react-native';

export const colors = {
    'primary-color': '#ffbf00',
    'secondary-color': '#c60cb1',
    'terciary-color': '#ff002a',
    'bg-color': '#0f0f0f',
    'bg-color-2': '#363436'
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors['bg-color'],
    },
    logo: {
        marginBottom: 18,
    },
    logoMini: {
        marginBottom: 36
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14,
    },
    input: {
        width: '95%',
        height: 40,
        backgroundColor: colors['bg-color-2'],
        color: '#fff',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    inputBig: {
        width: '95%',
        height: 60,
        backgroundColor: colors['bg-color-2'],
        color: '#fff',
        marginBottom: 24,
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
    },

    btn: {
        width: '95%',
        height: 40,
        backgroundColor: colors['primary-color'],
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors['bg-color']
    },
    title: {
        color: colors['primary-color'],
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 24
    }
});

export default styles;
