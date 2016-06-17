import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import { login, logout } from '../actions/auth';


class LoginForm extends Component {

  render(){

    return (
      <GiftedForm
        formName='loginForm'
        clearOnClose={true}
        
      >
        <GiftedForm.TextInputWidget
          name='email'
          title='Email'
          placeholder='email'
          keyboardType='email-address'
          clearButtonMode='while-editing'
          autoCapitalize='none'
        />
        <GiftedForm.TextInputWidget
          name='password'
          title='Password'
          placeholder='*****'
          secureTextEntry={true}
          clearButtonMode='while-editing'
        />


        <GiftedForm.SubmitWidget
          title='Login'
          onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
            console.info(isValid,values, validationResults, postSubmit)
            if (isValid === true) {
              // prepare object
            
              /* Implement the request to your server using values variable
              ** then you can do:
              ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
              ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
              ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
              */
              this.props.doLogin(values)
              .then((resp)=>{
                console.info(resp);
                if(resp.error){
                  postSubmit(['An error occurred, please try again']);    
                } else {
                  //postSubmit();
                }
                
              })
              
            }
          }}

        />
        <GiftedForm.ErrorsWidget />
        
      </GiftedForm>
    )


  }

}


class UserInfo extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.user.email}</Text>
        <TouchableHighlight onPress={()=>this.props.doLogout()}>
          <Text>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class UserProfile extends Component {
  render() {
    return (
      <View style={styles.container}>
        {!this.props.user && <LoginForm doLogin={this.props.login}/>}
        {this.props.user && <UserInfo doLogout={this.props.logout} user={this.props.user}/>}
      </View>
    );
  }
}






function mapStateToProps(state, ownProps) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps, {
  login,
  logout,
})(UserProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  
});