const hasSearchingValue = (str: string, searchVal: string) =>
	str.toLowerCase().indexOf(searchVal.toLowerCase()) > -1;

export { hasSearchingValue };
