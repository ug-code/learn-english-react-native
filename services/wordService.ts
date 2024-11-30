const BASE_URL = 'https://quarrelsome-tisha-larapi-cef81b40.koyeb.app/api/v1/mobileApp';

export const API_ENDPOINTS = {
    createKeyword: `${BASE_URL}/createKeyword`,
    getKeywordList: `${BASE_URL}/getKeywordList`,
    setLearnKeyword: `${BASE_URL}/setLearnKeyword`,
};

export default BASE_URL;


export const createKeywordService = async (userId: string, engKeyword: string, trKeyword: string) => {
    try {
        const response = await fetch(API_ENDPOINTS.createKeyword, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                eng_keyword: engKeyword,
                tr_keyword: trKeyword,
            }),
        });

        if (!response.ok) {
            throw new Error('API isteği başarısız oldu!');
        }

        return await response.json();
    } catch (error) {
        console.error('API hatası:', error);
        throw error;
    }
};

export const getKeywordListService = async () => {
    try {
        const response = await fetch(API_ENDPOINTS.getKeywordList, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('API isteği başarısız oldu!');
        }

        return await response.json();
    } catch (error) {
        console.error('API hatası:', error);
        throw error;
    }
};


export const setLearnKeywordService =async (id:any) => {
    try {
        const response = await fetch(`${API_ENDPOINTS.setLearnKeyword}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('API isteği başarısız oldu!');
        }

        return await response.json();
    } catch (error) {
        console.error('API hatası:', error);
        throw error;
    }
};
