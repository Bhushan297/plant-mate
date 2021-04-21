import * as SecureStore from 'expo-secure-store';
import React, { useState, createContext } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '../localization/en';
import hi from '../localization/hi';

const DEFAULT_LANGUAGE = 'en';
const APP_LANGUAGE = 'appLanguage';

i18n.translations = { en, hi };
i18n.locale = 'en';
i18n.fallbacks = true;

const LocalizationContext = createContext({});

export const LocalizationProvider = ({ children }) => {
    const [appLangauge, setAppLanguage] = useState(DEFAULT_LANGUAGE);
    
    const setLocale = async (locale) => {
        i18n.locale = locale;
        setAppLanguage(locale);
        await SecureStore.setItemAsync(APP_LANGUAGE, locale);
    }

    const getLocale = async () => {
        const locale = await SecureStore.getItemAsync(APP_LANGUAGE);
        return locale;
    }

    const initializeAppLanguage = async () => {
        const currentLanguage = await SecureStore.getItemAsync(APP_LANGUAGE);
        if (currentLanguage) {
            setLocale(currentLanguage);
        } else {
			setLocale(DEFAULT_LANGUAGE);
        }
    }

    return (
		<LocalizationContext.Provider
			value={{
                setLocale,
                getLocale,
                initializeAppLanguage
            }}
		>
			{children}
		</LocalizationContext.Provider>
	);
}

export default LocalizationContext;