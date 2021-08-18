import React, { useState } from "react";
import useFetch from "./hooks/useFetch";
import { removeUnderScores } from "./utils/array";
import { hasSearchingValue } from "./utils/string";
import Datatable from "./components/Datatable/Datatable";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";

const App = () => {
	const [data] = useFetch("https://swapi.dev/api/people");
	const [searchColumns, setSearchColumns] = useState<string[]>([
		"name",
		"height",
	]);
	const [query, setQuery] = useState<string>("");
	const formatedData = data.length ? removeUnderScores(data) : [];
	const columns = formatedData.length
		? Object.keys(formatedData[0]).slice(0, 8)
		: [];

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
			<SearchBar
				searchVal={query}
				handleChange={handleChange}
				searchboxes={columns}
				pickedSearchboxes={searchColumns}
				updateSearchbox={updateSearchCols}
			/>
			{formatedData.length ? (
				<Datatable
					headingColumns={columns}
					data={searchData(formatedData, searchColumns, query)}
				/>
			) : (
				<p>Loading datatable...</p>
			)}
		</div>
	);
};

export default App;
