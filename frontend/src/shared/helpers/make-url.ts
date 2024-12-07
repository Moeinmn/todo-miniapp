const makeUrl = (url: string, data: Record<string, unknown>) => {
    for (const key in data) {
        if (!data.hasOwnProperty(key)) {
            continue;
        }
        if (typeof data[key] === "string"){
            url = url.replace(`{${  key  }}`, data[key]);
        }
    }
    return url;
};
export default makeUrl;