export function getDataFromObject(o, path) {
	let changedPath = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
	changedPath = changedPath.replace(/^\./, '');           // strip a leading dot
	var a = changedPath.split('.');
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