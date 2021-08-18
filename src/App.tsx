import React, { useState } from "react";
import useFetch from "./hooks/useFetch";
import { removeUnderScores } from "./utils/array";
import { hasSearchingValue } from "./utils/string";
import Datatable from "./components/Datatable/Datatable";
import "./App.css";

const App = () => {
	const [data] = useFetch("https://swapi.dev/api/people");
	const [searchColumns, setSearchColumns] = useState(["name", "height"]);
	const [query, setQuery] = useState<string>("");
	const anyDataExist = data.length > 0;
	const formatedData = anyDataExist ? removeUnderScores(data) : [];
	const columns =
		formatedData.length > 0 && Object.keys(formatedData[0]).slice(0, 8);

	const handleChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(value);
	};

	const searchData = <T extends Record<string, string>>(
		data: T[],
		searchKeys: string[],
		searchVal: string,
	): T[] => {
		if (!searchKeys.length) {
			return data;
		}
		const searchedData = data.filter((row) => {
			return searchKeys.some((key) => hasSearchingValue(row[key], searchVal));
		});

		return searchedData;
	};

	const updateSearchCols = (col: string) => {
		setSearchColumns((prevState) =>
			prevState.includes(col)
				? prevState.filter((prevCol) => prevCol !== col)
				: [...prevState, col],
		);
	};

	return (
		<div className="app">
			<div className="search-bar">
				<div className="search-bar__search-input">
					<label>Search value</label>
					<input type="text" value={query} onChange={handleChange} />
				</div>
				{columns ? (
					columns.map((col) => (
						<label className="search-bar__search-box">
							<input
								type="checkbox"
								checked={searchColumns.includes(col)}
								onChange={() => updateSearchCols(col)}
							/>
							{col}
						</label>
					))
				) : (
					<p>Loading search items...</p>
				)}
			</div>
			{anyDataExist ? (
				<Datatable data={searchData(formatedData, searchColumns, query)} />
			) : (
				<p>Loading datatable...</p>
			)}
		</div>
	);
};

export default App;
