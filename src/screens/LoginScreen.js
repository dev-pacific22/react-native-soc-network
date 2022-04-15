import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { assets } from '../assets';
import { translate } from '../locales';
import { Colors } from '../utils/Colors';
import { CustomInput, CheckBoxInput, CustomAlert } from '../components';
import { Button } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import validator from 'validator';

const LoginScreen = ({
  navigation,
  loading,
  message,
  authStatus,
  signInAction,
  resetAction,
}) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const { username = '', password = '', isRememberMe = false } = values;
  const {
    hasErrorUsername,
    errorMessageUsername,
    hasErrorPassword,
    errorMessagePassword,
  } = errors;

  const onTextChange = (value, name) => {
    values[name] = value;
    setValues({ ...values });
  };

  const forgotPasswordClicked = () => {
    alert('Coming Soon...');
  };
  const onRememberMeClicked = () => {
    values.isRememberMe = !values.isRememberMe;
    setValues({ ...values });
  };

  const validateSignInForm = () => {
    const error = {};

    if (validator.isEmpty(username)) {
      // to check as email we can make it as validator.isEmail(username)
      error.hasErrorUsername = true;
      error.errorMessageUsername = translate('error_valid_username');
    }
    // if (!CONSTANTS.REGEX.PASSWORD_REGEX.test(password)) {
    if (validator.isEmpty(password)) {
      error.hasErrorPassword = true;
      error.errorMessagePassword = translate('error_valid_password');
    }
    return error;
  };

  const signInClicked = async () => {
    const error = validateSignInForm();
    setErrors({ ...error });
    console.log(error);
    if (Object.keys(error).length === 0) {
      try {
        await signInAction(username, password);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logoStyle} source={assets.app_logo} />
        <Text>{translate('label_sign_in')}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Spinner visible={loading} styles={styles.spinnerStyle} />
        <CustomInput
          name={'username'}
          placeHolder={translate('label_username')}
          iconName="user"
          hasError={hasErrorUsername}
          errorMessage={errorMessageUsername}
          value={username}
          onChangeText={onTextChange}
          keyboardType="email-address"
          disabled={loading}
        />

        <CustomInput
          name={'password'}
          placeHolder={translate('label_password')}
          iconName="lock"
          hasError={hasErrorPassword}
          errorMessage={errorMessagePassword}
          value={password}
          onChangeText={onTextChange}
          hasSecureTextEntry={true}
        />

        <View style={styles.forgotPasswordContainer}>
          <CheckBoxInput
            isChecked={isRememberMe}
            label={translate('label_remember_me')}
            onCheckBoxClick={onRememberMeClicked}
          />
          <Button
            transparent
            title="Forgot Password?"
            style={styles.forgotPasswordButtonStyle}
            onPress={() => forgotPasswordClicked()}>
            <Text>{translate('label_forgot_password')}</Text>
          </Button>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          primary
          rounded
          block
          title="Sign in"
          onPress={() => signInClicked()}>
          <Text>{translate('label_sign_in')}</Text>
        </Button>
        <Text>{translate('label_not_a_member')}</Text>
        <Button
          primary
          rounded
          block
          title="Sign up"
          onPress={() => navigation.replace('SignUp')}>
          <Text>{translate('label_sign_up')}</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    minHeight: '50%',
    padding: 10,
  },
  inputContainer: {
    flex: 0.6,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  spinnerStyle: {
    color: Colors.primary,
  },
  forgotPasswordContainer: {
    flex: 0.2,
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: '#674',
  },
  buttonContainer: {
    marginTop: 15,
    width: '100%',
    flex: 0.3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 70,
    flex: 0.1,
    alignItems: 'center',
  },
  logoStyle: {
    height: 100,
    width: 100,
  },
  forgotPasswordButtonStyle: {
    paddingLeft: 10,
    marginLeft: 10,
    alignContent: 'flex-end',
    backgroundColor: '#190',
  },
});
