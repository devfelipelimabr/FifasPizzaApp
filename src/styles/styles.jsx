import { StyleSheet, Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export const colors = {
    'primary-color': '#ffbf00',
    'secondary-color': '#c60cb1',
    'terciary-color': '#ff002a',
    'bg-color': '#0f0f0f',
    'bg-color-2': '#363436',
    'coldWhite': '#d9d9d9'
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors['bg-color'],
    },
    modalContent: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: colors.coldWhite,
        borderWidth: 1,
        borderColor: colors['bg-color-2'],
        borderRadius: 4
    },
    containerTop: {
        flex: 1,
        backgroundColor: colors['bg-color'],
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listContainer: {
        backgroundColor: colors['bg-color-2'],
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '95%',
        borderRadius: 4,
        borderWidth: .3,
        borderColor: colors['secondary-color'],
        padding: 12,
        marginBottom: 12,
    },
    qtdText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    logo: {
        marginBottom: 18,
    },
    logoMini: {
        position: 'absolute',
        top: "25%",
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
        justifyContent: 'center',
        textTransform: 'capitalize',

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
        textTransform: 'capitalize',
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
        color: colors['bg-color'],
        textTransform: 'capitalize',
    },
    title: {
        color: colors['primary-color'],
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 24,
        textTransform: 'capitalize',
    },
    title2: {
        color: colors['primary-color'],
        fontSize: 30,
        fontWeight: 'bold',
        marginRight: 14,
        textTransform: 'capitalize',
    },
    title3: {
        color: colors['primary-color'],
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 14,
        textTransform: 'capitalize',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24,

    },
    actions: {
        flexDirection: 'row',
        width: '95%',
        justifyContent: 'space-between'
    },
    btnAdd: {
        width: '20%',
        backgroundColor: colors['secondary-color'],
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    option: {
        alignItems: 'flex-start',
        borderTopWidth: .8,
        borderTopColor: colors['secondary-color']
    },
    item: {
        margin: 18,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors['bg-color'],
        textTransform: 'capitalize'
    },
    select: {
        color: '#fff',
        textTransform: 'capitalize'
    },
});

export default styles;
