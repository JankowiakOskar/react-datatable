import React from "react";

import "./Datatable.css";

type Props<T> = {
	data: T[];
};

const Datatable = <T extends Record<string, T>>({ data }: Props<T>) => {
	if (!data.length) {
		return null;
	}

	const columns = Object.keys(data[0]).slice(0, 8);

	return (
		<table className="data-table" cellPadding={10} cellSpacing={0}>
			<thead>
				<tr>
					{columns.map((col) => (
						<th key={col}>{col}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => (
					<tr key={index}>
						{columns.map((col) => (
							<td>{row[col]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Datatable;
