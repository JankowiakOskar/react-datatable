import { useState, useEffect } from "react";

const useFetch = (url: string) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(url)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(({ results }) => {
				setData(results);
			});
	}, [url]);

	return [data];
};

export default useFetch;
