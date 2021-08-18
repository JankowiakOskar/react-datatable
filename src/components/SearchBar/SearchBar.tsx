import "./SearchBar.css";

type Props = {
	searchVal: string;
	searchboxes: string[];
	pickedSearchboxes: string[];
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	updateSearchbox: (box: string) => void;
};

const SearchBar = ({
	searchVal,
	searchboxes,
	pickedSearchboxes,
	updateSearchbox,
	handleChange,
}: Props) => {
	return (
		<div className="search-bar">
			<div className="search-bar__search-input">
				<label>Search value</label>
				<input type="text" value={searchVal} onChange={handleChange} />
			</div>
			{searchboxes ? (
				searchboxes.map((box) => (
					<label className="search-bar__search-box">
						<input
							type="checkbox"
							checked={pickedSearchboxes.includes(box)}
							onChange={() => updateSearchbox(box)}
						/>
						{box}
					</label>
				))
			) : (
				<p>Loading searchboxes...</p>
			)}
		</div>
	);
};

export default SearchBar;
