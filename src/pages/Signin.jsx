import React, { useState, useContext } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'

import styles, { colors } from '../styles/styles'

import { AuthContext } from '../contexts/AuthContext'

export default function Signin() {
    const { signIn, loadingAuth } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin() {
        if (!email || !password) {
            return alert(`Preencha todos os campos`)
        }

        await signIn({ email, password })
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    placeholderTextColor='#d9d9d9'
                    value={email}
                    onChangeText={setEmail} />
                <TextInput
                    placeholder='Senha'
                    style={styles.input}
                    placeholderTextColor='#d9d9d9'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword} />

                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color={colors['primary-color']} />
                    ) : (
                        <Text style={styles.btnText}>Acessar</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}