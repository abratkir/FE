export function getDataFromObject(o, path) {
	path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
	path = path.replace(/^\./, '');           // strip a leading dot
	var a = path.split('.');
	for (var i = 0, n = a.length; i < n; ++i) {
		var k = a[i];
		if (k in o) {
			o = o[k];
		} else {
			return;
		}
	}
	return o;
};

export function removeFromArray(array, index) {
	if (array.length > index) {
		if (array.length === index) {
			return [];
		} else {
			if (index === 0) {
				return array.slice(1, array.length);
			} else {
				var result = array.slice(0, index);
				return result.concat(array.slice(index+1));
			}
		}
	}
	throw new Error('Index out of bound');
};