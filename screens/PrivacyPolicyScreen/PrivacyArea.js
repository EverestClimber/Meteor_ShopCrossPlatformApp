// TOP LEVEL IMPORTS
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//MODULES
import { stylesConfig, colorConfig, appConfig } from '../../modules/config';

const { appName, supportEmail } = appConfig;
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;

const CollectionOfYourInformation = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Collection of Your Information</Text>
			<Text>Your Information is collected on the Site when you voluntarily provide it. We also automatically collect certain online activity information as described below under “Log Files.” For example, {appName} collects Your Information (including your username and email address) when you register and open an Account.  You may fill out a Profile (including your first and/or last name, physical address, telephone number and, if applicable, organizational affiliation information) to supplement Your Information. </Text>
			<Text>If you decide to participate in a business plan competition, {appName} collects Your Information on behalf of the applicable business plan competition organizer. If a business plan competition organizer charges a Competition Fee, Your Information (including credit card account and billing information) may be collected by a third-party merchant service provider on behalf of the business plan competition organizer for the purpose of conducting your payment transaction. When you provide Your Information to the business plan competition organizer or third-party merchant service provider, collection and use of Your Information will be governed by the privacy policy of the business plan competition organizer or third-party merchant service provider.</Text>
		</View>
	);
}



const DisclosureOfYourInformation = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Use and Disclosure of Your Information</Text>
			<Text>{appName} will use Your Information to facilitate the services you request through the Site.  {appName} may display Your Information from your Profile on the Site and/or to other persons to facilitate social networking in the Startup Compete community. Please do not include any information in your Profile that you do not wish {appName} to share with others in this manner. We may also permit you to opt-in to sharing your profile information with third party social networking sites, such as Facebook.</Text>
			<Text>If your e-mail address or account is affiliated with a business plan competition organizer, {appName} may provide the business plan competition organizer with access to Your Information, including your e-mail address and phone number. That business plan competition organizer may display Your Information on the Site in connection with the competition and provide competition judges with access to Your Information. If a business plan competition organizer knows your name or e-mail address, {appName} may confirm to the business plan competition organizer that you have an account and use your e-mail address to invite you to become affiliated with a business plan competition. </Text>
			<Text>If you request information about or sign up for a business plan competition, {appName} will provide Your Information to that business plan competition organizer, who may use Your Information (i) to facilitate the services you request through the Site; (ii) to contact you about your request; (iii) to contact you about your participation in the competition and related activities; (iv) to provide updates; (v) to pursue additional discussion and/or collaboration with you and (vi) for other purposes you opt in to accept. {appName} may additionally provide Your Information to specific business plan competition organizers and other end users in response to your request, to facilitate the services you request through the Site, or if you opt in to share Your Information with them.</Text>
		
			<Text>{appName} may use Your Information for the purposes described in the previous paragraph, as well as (vii) to contact you after a competition for follow-up and (viii) for research purposes, provided any research results will be published in an anonymous form.</Text>
			<Text>{appName} will also share Your Information with its affiliated organizations for use consistent with their charitable purposes and with its service providers for the purpose of operating the site, facilitating the services you request and performing research. Business plan competition organizers, {appName}’s service providers and its affiliated entities with whom it shares Your Information are required to use Your Information in accordance with this Privacy Policy.</Text>
			<Text>{appName} may also use Your Information in an aggregated, anonymous form consistent with {appName}’s charitable purposes, including disclosing it to certain third parties for research purposes (e.g., {appName}’s affiliated entities, the National Institutes of Health, National Science Foundation and similar agencies) and publishing research based on analysis of data.</Text>
			<Text>{appName} will not sell or rent Your Information to third parties for marketing purposes and will require its service providers with whom it shares Your Information not to use Your Information (in aggregated or other forms) for direct marketing, advertising, or other commercial purposes.</Text>
			<Text>{appName} may also use Your Information for such purposes as contacting you to let you know about updates to the Site, activities related to the Site, and {appName}’s related charitable activities. You may unsubscribe to these messages by following the procedures described in the correspondence.</Text>
			<Text>As we continue to develop our organization, we may buy or sell parts of our organization or assets. In such transactions, confidential customer information generally is one of the transferred business assets and may be disclosed in connection with negotiations relating to a proposed transaction. In the event of a transaction involving the sale of some or all of {appName}’s organization, customer and site visitor information may be one of the transferred assets.  In such case, the transferred information may become subject to a different privacy policy.</Text>
			<Text>{appName} reserves the right to disclose Your Information to respond to a subpoena, court order or other legal process, to defend {appName} against legal claims, or if {appName} determines it is necessary to investigate or take action in connection with activities that {appName} suspects are illegal, threaten the safety of any person or are in violation of these Terms.</Text>

		</View>
	);
}


const Cookies = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Cookies</Text>
			<Text>{appName} may use “cookies” to make it easier for users to access the Site. A cookie is a small amount of data that is sent to your browser from a Web server and stored on your computer's hard drive.  We use cookies to allow faster and easier access to your account information, monitor traffic on the site and measure traffic patterns to improve functionality.  You may disable cookies in your internet browser, but this may limit your access to the Site and affect your use of certain features or functions. Web pages may in the future contain electronic images known as Web beacons  (sometimes called clear giffs or Web bugs) or other advanced technologies that are useful in the provision of services to you.  We may use such devices to verify compliance with our terms and conditions of use or with any promotions on the site.</Text>
			<Text></Text>
		</View>
	);
}



const CollectionAndUseOfAnonymous = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Collection and Use of Anonymous Information/Log Files</Text>
			<Text>As is true of most Web sites, we gather certain information automatically and store it in log files.  This information includes internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, operating system, date/time stamp, on-site bookmarks, on-site subscriptions, clickstream data and site navigation history. </Text>
			<Text>We use this information, which does not identify individual users, to analyze trends, to administer the site, to track users’ movements around the site and to gather information about our user base as a whole.  {appName} may collect this non-personal information even if you are not registered on the Site.</Text>
			<Text>We may link this automatically-collected data to personally identifiable information.  This information is tied to personally identifiable information to provide you with feedback about your experiences on the Site and to provide you with information that you may find interesting or informative.  {appName} may also link this information to a particular individual or combine it with personal information if {appName} has determined that it needs to identify a user because of safety or security issues or to comply with legal requirements.  We do not share this automatically-collected data with third parties except those that provide direct services to us to facilitate the upkeep and operation of the Site</Text>
		</View>
	);
}


const Security = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Security</Text>
			<Text>{appName} uses reasonable precautions to host and maintain the Site in a secure manner and to safeguard it from unauthorized access but it does not take special precautions, such as Secure Socket Layer encryption.  Your Information is stored in limited access servers. Neither {appName} nor its service providers can guarantee that any transmission of personal information over the Internet will be secure and you use the Site at your own risk.</Text>
			<Text></Text>
			<Text></Text>
		</View>
	);
}

const YourConsent = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Your Consent</Text>
			<Text>By using the Site, you expressly consent to this Privacy Policy and the uses of Your Information described in it. By providing Your Information on the Site, you consent to transfer of Your Information to the United States and storage, processing and use of Your Information in the United States and to the transfer of Your Information to {appName}’s service providers.  You further consent to use and disclosure of Your Information as set forth in this Privacy Policy.</Text>
		</View>
	);
}

const ReviewAndUpdate = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Review and Update of Your Information; Deactivation of Your Account</Text>
			<Text>You should be sure that your Profile is always accurate and complete. You may review your Profile at any time. You may modify your Profile information at any time by logging into your account. If you wish to deactivate your registration at any time, if your Account is in good standing, you may log into your account and click on the "Delete Account" feature.  However, we may retain a copy of Your Information for archival purposes.</Text>
		</View>
	);
}

const EUDataDirective = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>EU Data Directive Privacy Notice</Text>
			<Text>{appName} is committed to compliance with its privacy obligations in the United States and throughout the world. This EU Data Directive Privacy Notice sets forth the privacy principles {appName} follows with respect to personal information transferred from within the European Union to the United States. This notice applies to the personal information of European Union Citizens maintained by {appName} in the {appName} database.</Text>
		</View>
	);
}

const Notice = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Privacy Principles: Notice</Text>
			<Text>{appName} notifies data subjects about the purposes for which it collects and uses information about them. See "Collection of Your Information" and "Use and Disclosure of Your Information" above. Individuals may contact {appName}’s privacy director with the contact information provided below with any inquiries or complaints or to request information about the types of third parties (other than third party processors) to which it discloses the information and the choices and means it offers for limiting use and disclosure of personal information.</Text>
		</View>
	);
}

const Choice = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Privacy Principles: Choice</Text>
			<Text>For disclosures not covered by the "Use and Disclosure of Your Information" section above, {appName} will give data subjects the opportunity to choose whether Your Information will be disclosed to a third party (other than service providers) or used for a purpose incompatible with the purpose for which it was originally collected or subsequently authorized by the individual. By posting a Profile, you are choosing to have Your Information shared in the Startup Compete Community.  See "Use and Disclosure of Your Information" and "Review and Update of Your Information; Deactivation of Your Account" above for details on how to update or remove Your Information. </Text>
		</View>
	);
}

/*const Security = () => {
	return (
		<View style={{paddingBottom: 15}}>
			<Text>Privacy Principles: Security</Text>
			<Text>{appName} takes reasonable precautions to protect personal information from loss, misuse, unauthorized access, disclosure, alteration and destruction. See "Security" above.</Text>
		</View>
	);
}*/

const Limitations = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Privacy Principles: Limitations</Text>
			<Text>{appName}’s adherence to these principles may be limited to the extent required to respond to a legal or ethical obligation and to the extent expressly permitted by an applicable law, rule or regulation.</Text>
		</View>
	);
}

const Contact = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Privacy Principles: Contact</Text>
			<Text>If you have any questions about this Privacy Policy, please contact {appName} at:</Text>
			<Text>Manchester, NH 03101</Text>
			<Text>{supportEmail}</Text>
		</View>
	);
}


// EXPORTED COMPONENT
// ====================================
class PrivacyArea extends React.Component {
	render(){
		return (
			<View>
				<View style={{padding: 15}}>
					<Text>{appName} is committed to protecting the personal information you provide when you visit our Site (“Your Information”). Your use of this site (the "Site") is governed by this Privacy Policy. {appName} reserves the right to modify this Privacy Policy at any time by posting a notice on the home page of the Site. Your use of the Site after the notice is posted indicates you agree to the changes. This Privacy Policy is incorporated into {appName}’s Terms of Use so please be sure to read all of the terms that govern your use of the Site. Capitalized terms used without definitions in this Privacy Policy are defined in the Terms of Use.</Text>
				</View>
				<CollectionOfYourInformation />
				<DisclosureOfYourInformation />
				<Cookies />
				<CollectionAndUseOfAnonymous />
				<Security />
				<YourConsent />
				<ReviewAndUpdate />
				<EUDataDirective />
				<Notice />
				<Choice />
				<Limitations />
				<Contact />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorConfig.screenBackground,
  },
  header: {
  	fontSize: 17,
  	marginBottom: 4,
  	fontFamily: semiboldFont
  },
  textStyle: {
  	flexWrap: 'wrap'
  }
});




export default PrivacyArea;