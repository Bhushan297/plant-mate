export default {
	plantName: 'पौधा',
	plantDisease: 'रोग',
	plantProb: 'संभावना',
	plantCause: 'बीमारी का कारण',
	plantRemedy: 'निदान',
	predictOr: 'अथवा',
	faqTitle: 'लगातार पूछे जाने वाले प्रश्न',
	faqModalTitle:
		'आपका सवाल हमसे पूछ सकते हैं और हम इस अनुभाग को जल्द से जल्द अपडेट करेंगे',
	faqModalPlaceholder: 'अपना प्रश्न दर्ज करें',
	buttonSend: 'भेजें',
	buttonDismiss: 'बंद करे',
	buttonLogout: 'लॉग आउट',
	buttonLanguage: 'भाषा बदलें',
	faqApi: '/faq_hindi',
	plantApi: '/plants_hindi',
	predictApi: '/predict_hindi',
	helpModalTitle: 'अनुदेश',
	helpList: [
        { 
            id: 0,
            data : "दो विकल्प हैं, एक को गैलरी से चुनना है और दूसरा विकल्प कैमरे से एक छवि पर क्लिक करना है।",
        },
        { 
            id: 1,
            data : "एक छवि अपलोड करते समय, सुनिश्चित करें कि पृष्ठभूमि सफेद है ताकि आपको पौधे रोग की उचित भविष्यवाणी मिल सके।",
        },
        { 
            id: 2,
            data : "यदि आप ऐसी छवि का चयन करते हैं जो रोगग्रस्त पौधे की नहीं है, तो यह दर्शाएगा कि आपकी छवि अमान्य है।",
        },
		{ 
            id: 3,
            data : "यदि आप एक धुंधली छवि अपलोड करते हैं, तो यह आपको झूठी भविष्यवाणी देगा।",
        },
        { 
            id: 4,
            data : "केवल पत्ती रोग की छवि अपलोड करें।",
        }
    ],
};
