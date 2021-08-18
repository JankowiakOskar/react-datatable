const removeUnderScores = <T extends { [k: string]: any }>(data: T[]) => {
	const formatedData = data.map((obj) => {
		const mapedObj = Object.keys(obj).reduce((acc, key: string) => {
			if (key.includes("_")) {
				const newKey = key.replace("_", " ");
				acc[newKey] = obj[key];
			} else {
				acc[key] = obj[key];
			}
			return acc;
		}, {} as Record<string, T>);
		return mapedObj;
	});
	return formatedData;
};

export { removeUnderScores };
