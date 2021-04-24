export default {
    plantName: 'Plant',
    plantDisease: 'Disease',
    plantProb: 'Probability',
    plantCause: 'Cause of disease',
    plantRemedy: 'Remedy',
    predictOr: 'OR',
    faqTitle: 'Frequently Asked Questions',
    faqModalTitle:
        'Your can ask question to us and we will update this section as soon as possible',
    faqModalPlaceholder: 'Enter your question',
    buttonSend: 'Send',
    buttonDismiss: 'Dismiss',
    buttonLogout: 'Log Out',
    buttonLanguage: 'Change Language',
    faqApi: '/faq',
    plantApi: '/plants',
    predictApi: '/predict',
    helpModalTitle: 'Instructions',
    helpList: [
        { 
            id: 0,
            data : "There are two options , one is to select from gallary and other option is to click an image from camera.",
        },
        { 
            id: 1,
            data : "While uploading an image , make sure the background is white so that you get proper prediction of plant disease.",
        },
        { 
            id: 2,
            data : "If you select an image which is not of the diseased plant,it will show that your image is Invalid.",
        },
        { 
            id: 3,
            data : "If you upload a blur image, then it will give you false prediction",
        },
        { 
            id: 4,
            data : "Only upload image of leaf having disease",
        }
    ],
}