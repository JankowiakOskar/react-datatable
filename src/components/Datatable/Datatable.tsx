import React from "react";

import "./Datatable.css";

type Props<T> = {
	headingColumns: string[];
	data: T[];
};

const Datatable = <T extends Record<string, T>>({
	headingColumns,
	data,
}: Props<T>) => {
	if (!data.length) {
		return null;
	}

	return (
		<table className="data-table" cellPadding={10} cellSpacing={0}>
			<thead>
				<tr>
					{headingColumns.map((col) => (
						<th key={col}>{col}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => (
					<tr key={index}>
						{headingColumns.map((col) => (
							<td>{row[col]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Datatable;
