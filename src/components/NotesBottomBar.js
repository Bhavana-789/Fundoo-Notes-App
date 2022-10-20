import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import BottomPopup from './BottomPopup';
// import {connect} from 'react-redux';
// import {getLabels} from '../redux/action';
// import {bindActionCreators} from 'redux';

export default class NotesBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
    };
    console.log(this.props);
  }

  close = () => {
    this.setState({
      isShown: false,
    });
  };

  render() {
    const {navigation, data} = this.props;
    const {isShown} = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{marginLeft: 20}} onPress={() => {}}>
          <Feather name="plus-square" size={25} color={'#2f4f4f'} />
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft: 30}} onPress={() => {}}>
          <Ionicons name="color-palette-outline" size={25} color={'#2f4f4f'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginLeft: 247}}
          onPress={() => {
            this.setState({
              isShown: !this.state.isShown,
            });
          }}>
          <Ionicons name="ellipsis-vertical" size={25} color={'#2f4f4f'} />
        </TouchableOpacity>
        <BottomPopup
          navigation={navigation}
          show={isShown}
          deleteNote={this.props.deleteNote}
          closePopup={this.close}
          data={data}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    padding: 2,
    marginTop: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
});

// const mapStateToProps = state => ({
//   labels: state,
// });

// const ActionCreators = Object.assign({}, getLabels);
// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(ActionCreators, dispatch),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(NotesBottom);
