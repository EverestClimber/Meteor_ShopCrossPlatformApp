// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { List, Checkbox, InputItem, WhiteSpace } from 'antd-mobile';
// MODULES
import { stylesConfig, colorConfig, SCREEN_WIDTH } from '../../modules/config';
import { CATEGORY_OPTIONS } from '../../modules/helpers';
// COMPONENTS
import LoadingScreen from '../../components/LoadingScreen';
//REDUX
import { connect } from 'react-redux'
import * as actions from '../../actions';



// CONSTANTS & DESTRUCTURING
// ========================================
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;
const CheckboxItem = Checkbox.CheckboxItem;

// EXPORTED COMPONENT
// ========================================
class FiltersScreen extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		mode: 'modal',
	  	header: null, //(headerProps) => Platform.OS === 'android' ? null : <Header {...headerProps} />, 
	  	tabBarVisible: false
	});
	constructor(props){
		super(props);
		this.onToggleNearMe = this.onToggleNearMe.bind(this);
	}
	onCategoryChange(value){
		this.props.addCategoryToFilter(value)
	}
	onToggleNearMe(value){
		if (this.props.nearMe) {
			return this.props.toggleNearMeToFilter()
		}
		this.props.toggleNearMeToFilter()
		this.props.addNearMeLocation(this.props.screenProps.currentLocation)		
	}
	render(){
		const { nearMe, navigation, selectedCategories, clearCategoriesFilter, toggleNearMeToFilter } = this.props;
			return (
				<View style={styles.container}>
					<View style={styles.backButtonContainer}>
						<Icon size={33} color='#666' name='keyboard-backspace' onPress={()=>navigation.goBack()} />
					</View>
					<Text style={{textAlign: 'center', marginBottom: 10}}>Filter By Categories</Text>
					<View style={{width: 200, height: 300}}>
						<ScrollView>
							{CATEGORY_OPTIONS.map(i => (
								<CheckboxItem 
									key={i.value}
									checked={selectedCategories.includes(i.value)}
									onChange={() => this.onCategoryChange(i.value)}
								>
									{i.label}
								</CheckboxItem>
							))}
						</ScrollView>
					</View>
					<View style={{height: 50, width: 300, marginTop: 10}}>
						<TouchableOpacity onPress={() => clearCategoriesFilter()}>
							<Text style={{textAlign: 'center'}}>Clear Categories</Text>
						</TouchableOpacity>
					</View>
					
					<View style={{height: 50, width: 300, marginTop: 20}}>
						<CheckboxItem checked={nearMe} onChange={this.onToggleNearMe}>
							RESULTS NEAR ME
						</CheckboxItem>
					</View>
				</View>
			);
	}
}


// STYLES
// ========================================
// STYLES
// ========================================
const styles = StyleSheet.create({
	contentContainerStyle: {
		backgroundColor: colorConfig.screenBackground,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	container: {
		flex: 1,
		backgroundColor: colorConfig.screenBackground,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backButtonContainer: {
	    position: 'absolute',
	    top: 22,
	    left: 10
	}
});

let mapStateToProps = ({ filter }) => {
	return {
		selectedCategories: filter.selectedCategories,
		nearMe: filter.nearMe
	}
}

// EXPORT
// ========================================
export default connect(mapStateToProps, actions)(FiltersScreen);

