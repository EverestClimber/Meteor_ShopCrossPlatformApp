import React from 'react';
import { View, Text, AsyncStorage, ScrollView, StyleSheet, Platform } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
//COMPONENTS
import BackButton from '../../components/BackButton'
//MODULES
import { stylesConfig, colorConfig, appConfig } from '../../modules/config';

const { appName } = appConfig;
const { screenBackground } = colorConfig;
const { boldFont, semiboldFont, regularFont, titleStyle, basicHeaderStyle } = stylesConfig;


const TopRow = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>(Effective as of May 13, 2015)</Text>
			<Text>Welcome to {appName} (the “Site”). Please read these Terms of Use carefully, as they contain certain limitations, exclusions and a Binding Arbitration provision.</Text>
		</View>
	);
}

const AcceptanceOfTerms = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Acceptance of Terms; Changes to Terms.</Text>
			<Text style={[styles.textStyle]}>These Terms of Use, including the Privacy Policy (collectively, “Terms”), govern your use of the Site.  Please read all of the Terms carefully.  By using the Site, you agree to comply with and be bound by these Terms.  If you do not agree to the Terms, you are not authorized to use the Site.  {appName} reserves the right to modify the Terms at any time by posting a notice on the home page of the Site.  Your use of the Site after the notice is posted indicates you agree to the changes.</Text>
		</View>
	);
}

const Privacy = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Privacy.</Text>
			<Text>Please be sure to review {appName}’s Privacy Policy, which is part of these Terms. Registration; Suspension or Termination of Account; Access from other Countries; Special Accounts and Roles.</Text>
		</View>
	);
}

const Registration = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>(A) Registration.</Text>
			<Text>To access certain information and functionality, you must register on the Site and open a user account (“Account”).  You are responsible for maintaining the confidentiality of the user name and password associated with your Account and for all activity under your Account, and you may not transfer your Account to another party. You warrant that all information you provide to {appName} is accurate and we request that you update your Account as necessary to keep it accurate and complete.  There may be eligibility requirements for registration.</Text>
		</View>
	);
}

const Suspension = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>(B) Suspension or Termination of Account, Access or Group Activity.</Text>
			<Text>To access certain information and functionality, you must register on the Site and open a user account (“Account”).  You are responsible for maintaining the confidentiality of the user name and password associated with your Account and for all activity under your Account, and you may not transfer your Account to another party. You warrant that all information you provide to {appName} is accurate and we request that you update your Account as necessary to keep it accurate and complete.  There may be eligibility requirements for registration.</Text>
			<Text>(iii) if we receive multiple notices of infringement in accordance with the Digital Millennium Copyright Act relating to your Account(s), or (iv) for other reasons that {appName} determines in good faith are necessary or appropriate, including if {appName} suspects you are using or attempting to use the Site in any way that violates any applicable laws or regulations.  {appName} may also suspend or terminate your Account for prolonged inactivity in your Account. We may also terminate your access to or administrative rights in any User Input Room (as defined in paragraph 5) for any of the above reasons.  You agree that neither {appName} nor its service providers are liable to you for any loss or damages that may result from our refusal to provide you access to the Site.  You may terminate your Account at any time.</Text>
		</View>
	);
}

const AccessCountries = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>(C) Access from other Countries</Text>
			<Text>{appName} makes no representation or warranty that any competition or content accessible through the Site are appropriate or available for use in locations outside the United States. If you choose to access the Site from other locations, you do so at your own risk and are responsible for compliance with all applicable laws. You are not authorized to access the Site from any location where doing so would be illegal.  </Text>
		</View>
	);
}

const SpecialAccounts = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>(D) Special Accounts and Roles.</Text>
		</View>
	);
}

const UseOfSite = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Use of Site for Lawful Purposes; Export Controls; Confidential Information; User Content.</Text>
			<Text style={styles.textStyle}>(A) Lawful Purposes.  You agree to use the Site only for lawful purposes and not in any way that would violate (i) the rights of {appName}, a business plan competition organizer, a university, any other organization affiliated with a competition or any other party or (ii) any applicable law. </Text>
			<Text style={styles.textStyle}>(B) Export Controls.  The United States export control laws regulate the export of technology originating in the United States, including electronic transmission of information and software to foreign countries and to certain foreign nationals.  You agree to comply with all applicable export control laws and regulations including the Export Administration Regulations maintained by the Bureau of Industry and Security of the U.S. Department of Commerce, trade and economic sanctions maintained by the Treasury Department’s Office of Foreign Assets Control, the International Traffic in Arms Regulations maintained by the Department of State, and the Uniting and Strengthening of America by Providing Appropriate Tools to Intercept and Obstruct Terrorism Act of 2001 and not to transfer, by electronic transmission or otherwise, any content published on the Site to either a foreign destination or foreign national in violation of applicable law.</Text>
			<Text style={styles.textStyle}>(C) Confidential Information.  If you are a business plan competition organizer or judge, you may receive personal or confidential information of individual users (“User Confidential Information”) in connection with competition or a request for information.  You shall use at least the same degree of care in safeguarding the User Confidential Information as confidential as you use in safeguarding your own confidential information, but in no event shall you use less than due diligence and care.  You shall only forward such User Confidential Information to others within your organization on a need to know basis. </Text>
			<Text style={styles.textStyle}>(D) User Content.</Text>
			<Text style={styles.textStyle}>(i) {appName} may offer the opportunity for you and others to contribute ideas, comments, questions and other communications to or from the Site (the "User Content") in message boards, group areas, communities, blogs, competition sub-sites, e-mail and other features of the Site ("User Input Rooms") that may be offered from time to time and may be operated by {appName}, by a business plan competition organizer, or by a third party. User Content shall include any business plans and related information you submit through the Site.  You shall not (nor cause any third party to) use the Site to perform any illegal activities (including defaming, abusing, harassing, stalking, threatening or otherwise violating the legal rights - such as rights of privacy -of others) or immoral activities.  Specifically, but not by way of limitation, you shall not undertake any of the following types of activities: transmitting information that infringes any patent, trademark, trade secret, copyright or other proprietary rights of any party;transmitting any material that contains software viruses, Trojan horses, worms, time bombs, cancelbots, or any other computer code, files, or programs which may interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment;impersonating anyone or any entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity; advertising or disseminating commercial content; interfering with or disrupting the Site; disrupting the activities or enjoyment of the Site for other users; or collecting or storing personal data about other users, except as needed for activities permitted on the Site.</Text>
			<Text style={styles.textStyle}>(ii) You should exercise discretion before relying on information contained in User Content. You agree to evaluate, and assume all risks associated with the use of any User Content, including without limitation any risk relating to any reliance on the accuracy, completeness, or usefulness of such User Content. {appName} assumes no responsibility for the information contained in User Content.</Text>
			<Text style={styles.textStyle}>(iii)  You agree that {appName}, in its sole discretion, may remove any User Content from a User Input Room offered by {appName}, at any time and for any or no reason. You agree that {appName} shall not be liable to you or any third party for any deletion of any User Content on the Site.  You may remove your User Content from the Site at any time.</Text>
			<Text style={styles.textStyle}>(iv)  You acknowledge and agree that {appName} may preserve and disclose User Content if required to do so by law or if {appName} believes in good faith that such preservation or disclosure is reasonably necessary to comply with legal process, enforce this Agreement, respond to a claim that User Content violates any third party's rights, or protect the right, property or personal safety of {appName}, any users of the Site, or the public. You also acknowledge that the technical processing and transmission of the Site, including without limitation User Content, may involve transmissions over various networks and changes to conform and adapt to technical requirements of connecting networks or devices.</Text>
			<Text style={styles.textStyle}>(v)  {appName} may offer the opportunity for you and others to contribute User Content in User Input Rooms operated by a third party that may be offered from time to time. {appName} assumes no responsibility or liability whatsoever for such User Content, or for the use of any User Input Room operated by a third party. Without limitation to the foregoing, {appName} shall not be liable for the collection, use or disclosure of any personal information by, in or through a User Input Room operated by a third party. In such circumstances, you must refer to any terms of service and privacy statement of the third party operating the User Input Room.</Text>
			<Text style={styles.textStyle}>(vi)  Subject to any applicable law and the requirements of the {appName}’s privacy policy, any communications sent by you via this Site or otherwise to {appName} (including without limitation User Content) are on a non-confidential basis, and {appName} is under no obligation to refrain from reproducing, publishing or otherwise using them in any way or for any purpose related to the Site or its users. You shall be responsible for the content and information contained in any communication sent by you to this Site or otherwise to {appName}, including without limitation for its truthfulness and accuracy.</Text>
			<Text style={styles.textStyle}>(vii)  {appName} does not claim any ownership rights in the User Content you post to the Site.  When you post User Content to the Site, you grant to {appName}, and you represent and warrant that you have the right to grant to {appName}, an irrevocable, perpetual, non-exclusive, transferable, royalty free, worldwide license (with the right to sublicense) to copy, publicly perform, publicly display, reformat, translate, excerpt, distribute, create derivative works from and otherwise use such User Content for any purpose on or in connection with the Site.  Notwithstanding the foregoing, {appName} will not publicly display your business plans without your prior consent, but may display a summary or abstract of your plan unless you opt out of such display.</Text>
			<Text style={styles.textStyle}>(viii)  The administrator of any User Input Room determines its membership and may terminate access by any individual user at any time.</Text>
		</View>
	);
}


const IntellectualProperty = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Intellectual Property.</Text>
			<Text style={styles.textStyle}>(A) Content.  The content on the Site is owned by or licensed to {appName}.  As between you and the business plan competition organizers, you retain ownership of all rights, including copyrights, patents, and other intellectual property rights, in the business plans you submit through the Site.  As between you and {appName}, {appName} owns all rights, including copyrights, patents, and other intellectual property rights, in the Site.  You agree not to copy any content on the Site (unless it is User Content generated by you or you are permitted to do so by a Competition Agreement) or to modify, decompile, disassemble, create derivative works from or otherwise reverse engineer any content on the site, or other content or computer programs associated with the Site. </Text>
			<Text style={styles.textStyle}>(B)  Restrictions on Data Usage.  You may not, without the prior written permission of {appName}, use any computer code, data mining software, robot, bot, spider, scraper, or other automatic device, program, algorithm or methodology having similar process or functionality, or any manual process, to deeplink to, redistribute, retransmit, republish, commercially exploit, display or copy in bulk the content found on or through the Site.</Text>
			<Text style={styles.textStyle}>(C) Trademarks.  {appName} owns all rights in its name, trademarks, service marks, logos, and other indicia of source ({appName} Trademarks), including {appName} and Startup Compete.  You may not use any {appName} Trademarks in connection with any products or services or in any manner that could tarnish any {appName} Trademarks or disparage {appName}.  The trademarks of the various business plan competitions are owned by, and may be used only as permitted by, the applicable business plan competition organizer.  The trademarks of the various schools and other organizations are owned by, and may be used only as permitted by, the applicable school or other organization. </Text>
			<Text style={styles.textStyle}>(D) Notice and Procedure for Making Claims of Copyright Infringement/Digital Millennium Copyright Act.  {appName} will process notices of alleged infringement which it receives and will take appropriate action as required by the Digital Millennium Copyright Act (DMCA) and other applicable intellectual property laws.  If you believe that your work has been copied on the Site in a way that constitutes copyright infringement, please provide {appName}’s Copyright Agent with the following information in a notice (“Notice”).  To be effective, the Notice must be in writing and contain the following information (DMCA 17 U.S.C. §512(c)(3)):</Text>
			<Text style={styles.textStyle}>(i) an electronic or physical signature of the person who is authorized to act on behalf of the copyright owner;</Text>
			<Text style={styles.textStyle}>(ii) a description of the copyrighted work that you claim has been infringed;</Text>
			<Text style={styles.textStyle}>(iii) identification of the copyrighted work you claim is being infringed (and, if possible, a location where an authorized copy of the copyrighted work exists, for example the URL of the website where it is posted or the name of the book in which it has been published);</Text>
			<Text style={styles.textStyle}>(iv) identification of the URL or other specific location on the Site where the material that you claim is infringing is located (you must include enough information so that {appName} can locate the material);</Text>
			<Text style={styles.textStyle}>(v) your address, telephone number, and email address;</Text>
			<Text style={styles.textStyle}>(vi) a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; and</Text>
			<Text style={styles.textStyle}>(vii) a statement by you, made under penalty of perjury, that the above information in your Notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</Text>
		</View>
	);
}

const Links = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Links.</Text>
			<Text style={styles.textStyle}>From time to time, {appName} may provide links to other sites that may be of interest to you.  Such links do not mean that {appName} endorses any other site or its products or services.  You acknowledge that {appName} has no control over or responsibility for the content or practices of any other site.  Please read any terms of use and privacy policies that govern activities on other sites. </Text>
			<Text></Text>
		</View>
	);
}


const Disclaimers = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Disclaimers.</Text>
			<Text style={styles.textStyle}>THE SITE IS OFFERED ON AN “AS IS” AND “AS AVAILABLE” BASIS AND YOU USE IT AT YOUR OWN RISK.  NEITHER {appName} NOR ITS SERVICE PROVIDERS MAKE ANY WARRANTY, EXPRESS OR IMPLIED, THAT THE SITE WILL OPERATE WITHOUT ERROR OR INTERRUPTION OR BE FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE INFORMATION ON THE SITE, INCLUDING THE BUSINESS PLANS AND CONTENT PROVIDED BY OTHER USERS, WILL BE ACCURATE, TIMELY OR COMPLETE.  TO THE FULL EXTENT PERMITTED BY APPLICABLE LAW, {appName} AND ITS SERVICE PROVIDERS EXPRESSLY DISCLAIM ANY WARRANTIES OF TITLE, MERCHANTABILITY, NONINFRINGEMENT AND FITNESS FOR A PARTICULAR PURPOSE (EVEN IF THE PURPOSE HAS BEEN DISCLOSED). </Text>
		</View>
	);
}


const LimitationOfLiability = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Limitation of Liability.</Text>
			<Text style={styles.textStyle}>NEITHER {appName} NOR ANY SERVICE PROVIDER WILL BE LIABLE UNDER CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHER LEGAL OR EQUITABLE THEORY (WHETHER OR NOT {appName} HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE), FOR (A) ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL OR EXEMPLARY DAMAGES (INCLUDING LOST REVENUE, LOST PROFITS, BUSINESS INTERRUPTION OR LOST DATA) ARISING OUT OF YOUR USE OF OR INABILITY TO USE THE SITE OR (B) ANY DAMAGES, LOSS OR INJURY BASED ON ERRORS, OMISSIONS, INTERRUPTIONS, INACCURACIES OR SIMILAR PROBLEMS ARISING IN CONNECTION WITH YOUR USE OF, INTERACTION WITH, OR TRANSACTIONS THROUGH THE SITE.  NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, {appName}’s LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER, AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO {appName}, AND IF NO AMOUNTS WERE PAID WILL NOT EXCEED $1000. THESE LIMITATIONS WILL APPLY REGARDLESS OF ANY FAILURE OF ESSENTIAL PURPOSE.  SOME STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR EXCLUSIONS OR LIMITATIONS OF CERTAIN DAMAGES AND SO SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS OR LIMITATIONS MAY NOT APPLY TO YOU. </Text>
		</View>
	);
}

const Indemnity = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Indemnity.</Text>
			<Text style={styles.textStyle}>By using the Site, you agree to indemnify and hold {appName} and its directors, officers, employees, licensors, service providers, contractors, and agents ({appName} Indemnitees) harmless from any claims, liability, loss, damage or expense (including reasonable attorneys’ fees and costs) that any {appName} Indemnitee may incur based on your use of the Site, your transactions through the Site, the competitions operated through the Site, your breach of these Terms or any competition rules, your violation of the rights of a third party or your violation of any law, including export control laws.</Text>
			<Text></Text>
		</View>
	);
}

const DisputeResolution = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>Dispute Resolution.</Text>
			<Text style={styles.textStyle}>(A) Governing Law.  These Terms are governed by the laws of the United States and the laws of the District of Columbia applicable to contracts executed and performed within the District of Columbia, without giving any effect to any conflict of laws rules that may result in the application of the laws of any other jurisdiction.  These Terms are deemed executed and enforceable in the District of Columbia.</Text>
			<Text style={styles.textStyle}>(B) Binding Arbitration. If a dispute arises between you and {appName}, each party irrevocably agrees to (i) resolve the dispute through binding arbitration conducted in the District of Columbia in accordance with the rules of the American Arbitration Association (“AAA”), (ii) bring any dispute to enforce arbitration under these Terms or to pursue injunctive relief exclusively in the federal and state courts located in the District of Columbia, United States of America and (iii) submit to the exclusive jurisdiction of those courts and waive any objection to the exclusive jurisdiction of those courts based on forum non conveniens or other grounds.  Each party will be responsible for its expenses and an equal share of the arbitrators' and administrative fees of arbitration.  Notwithstanding the foregoing, {appName} will have the right to seek temporary injunctive relief if it determines it is necessary in connection with any breach of these Terms that could result in irreparable harm to {appName} (including infringement of any intellectual property).</Text>
		</View>
	);
}

const GeneralProvisions = () => {
	return (
		<View style={{padding: 15}}>
			<Text style={[styles.header]}>General Provisions.</Text>
			<Text style={styles.textStyle}>(A) Assignment.  You may not assign these Terms or any of your obligations under them without {appName}’s prior written consent and any attempted assignment is null and void.  {appName} may assign these Terms and any of its obligations under them at any time for any reason.</Text>
			<Text style={styles.textStyle}>(B) Relationship of Parties.  You and {appName} are independent contractors and these Terms may not be used to construe a joint venture, employee, partnership, agency or similar relationship between you and {appName}.</Text>
			<Text style={styles.textStyle}>(C) Electronic Communications; Binding and Entire Agreement; English Language.  You agree that (i) these Terms constitute an agreement “signed by you” under any applicable law; (ii) any notices or other communication regarding your use of the Site may be provided to you electronically (by posting on the Site, by email, and other electronic formats) and will be considered received upon posting or other distribution, but {appName} reserves the right to provide communications in paper format.  These Terms (including the Privacy Policy) constitute the entire agreement between you and {appName} and supersede all other agreements, oral or written, concerning its subject matter.  You consent to the use of the English language in these Terms and all documents or notices relating to them and your use of the Site.</Text>
			<Text style={styles.textStyle}>(D) Including.  The word “including” as used in these Terms means “including, without being limited to.”</Text>
			<Text style={styles.textStyle}>(E) Severability.  If any of these Terms is determined to be unenforceable for any reason, then the unenforceable provision will be deemed amended in a manner that will most nearly carry out the intent of the provision to the fullest extent permitted by applicable law or deleted if amendment is not possible, and the remaining Terms will be enforceable to the fullest extent permitted by law.</Text>
			<Text style={styles.textStyle}>(F) No Waiver.  {appName}’s failure to enforce these Terms in every instance in which they might apply is not a waiver of any of {appName}’s rights, and {appName} reserves its right to take all legal steps available to enforce these Terms.</Text>
			<Text style={styles.textStyle}>(G) Survival.  Paragraphs 3, 5(C), 6, 8, 9, 10, 12 and 14 (and any other sections that by their intent should survive) will survive any termination of these Terms.</Text>
			<Text style={styles.textStyle}>(H) Force Majeure.  If {appName} is unable to perform its services or any of its obligations due to any cause beyond its reasonable control, including computer, telecommunications or other equipment failures, electrical power failures, strikes, labor disputes, shortage of labor or materials, civil disturbances, fires, floods, storms, explosions, acts of God, war, terrorist acts, governmental actions, non-performance of third parties or similar reasons, then {appName}’s performance will be excused and the time for performance will be extended until a reasonable time following the end of the event of force majeure.</Text>
		</View>
	);
}

// EXPORTED COMPONENT
// ====================================


class TermsArea extends React.Component {
	render(){
		return (
			<View>
				<TopRow />
				<AcceptanceOfTerms />
				<Privacy />
				<Registration />
				<Suspension />
				<AccessCountries />
				<SpecialAccounts />
				<UseOfSite />
				<IntellectualProperty />
				<Links />
				<Disclaimers />
				<LimitationOfLiability />
				<Indemnity />
				<DisputeResolution />
				<GeneralProvisions />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: screenBackground,
  },
  header: {
  	fontSize: 17,
  	marginBottom: 7,
  	fontFamily: semiboldFont
  },
  textStyle: {
  	marginBottom: 4,
  }
});


export default TermsArea;
